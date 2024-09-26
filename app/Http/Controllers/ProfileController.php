<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        $user = auth()->user();
    
        // Update the user's other details
        $user->update([
            'name' => $request->input('name'),
            'username' => $request->input('username'),
            'email' => $request->input('email'),
        ]);
    
        // Handle the profile image upload
        if ($request->hasFile('profile_image')) {
            // Delete old profile image if it exists
            if ($user->profile_image) {
                Storage::delete($user->profile_image); // Adjust this path if needed
            }
    
            // Store the new profile image
            $filePath = $request->file('profile_image')->store('profile_images', 'public');
    
            // Update the user's profile with the new image path
            $user->update([
                'profile_image' => $filePath,
            ]);
        }
    
        return redirect()->back()->with('status', 'Profile updated successfully!');
    }
    
    

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        // Delete profile image if it exists
        if ($user->profile_image) {
            Storage::delete($user->profile_image);
        }

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
