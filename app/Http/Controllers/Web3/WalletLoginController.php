<?php

namespace App\Http\Controllers\Web3;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class WalletRegistrationController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'wallet_address' => 'required|string|size:42|unique:users,wallet_address',
        ]);

        // Create the user with the wallet address
        try {
            $user = User::create([
                'wallet_address' => $request->wallet_address,
                'name' => 'User ' . substr($request->wallet_address, 0, 6) . '...',
                'role_id' => 5,  // Default role ID for new users
            ]);

            return response()->json(['success' => true, 'message' => 'Wallet registered successfully']);
        } catch (\Exception $e) {
            Log::error('Error registering wallet: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to register wallet']);
        }
    }
}
