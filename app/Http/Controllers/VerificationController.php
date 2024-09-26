<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function showGetVerified()
    {
        return inertia('Auth/GetVerifiedPage'); 
    }

    public function store(Request $request)
{
    $request->validate([
        'portfolio_url' => 'required|url',
        'identification_document' => 'required|file|mimes:jpg,jpeg,png,pdf',
    ]);

    // Store artist verification
    $verification = ArtistVerification::create([
        'user_id' => auth()->id(),
        'portfolio_url' => $request->portfolio_url,
        'identification_document' => $request->file('identification_document')->store('identification_documents', 'public'),
        'status_id' => 1, // Pending status
    ]);

    // Store social media accounts
    if ($request->facebook) {
        SocialMediaAccount::create(['user_id' => auth()->id(), 'platform' => 'Facebook', 'url' => $request->facebook]);
    }

    // Add more social media accounts here...

    return redirect()->back()->with('success', 'Verification submitted successfully.');
}

}
