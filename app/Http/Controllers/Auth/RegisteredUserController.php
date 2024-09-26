<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration/login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');  // We will use the same view for both registration and login
    }

    /**
     * Handle MetaMask registration or login request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'wallet_address' => 'required|string|size:42',  // Validate the wallet address
        ]);
    
        // Check if the wallet address exists
        $user = User::where('wallet_address', $request->wallet_address)->first();
    
        if ($user) {
            // Wallet address already exists, log the user in
            Auth::login($user);
        } else {
            // Wallet address does not exist, create a new user and log them in
            $user = User::create([
                'wallet_address' => $request->wallet_address,
                'name' => 'New User',  // Optional: you can have a default name or update it later
                'role_id' => 5,  // Default role for wallet-based users
            ]);
    
            event(new Registered($user));
    
            // Log the user in after registration
            Auth::login($user);
        }
    
        // Redirect to the dashboard
        return redirect()->route('dashboard');
    }
    
}
