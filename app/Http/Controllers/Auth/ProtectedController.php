<?php

use Illuminate\Support\Facades\Auth;

class ProtectedController extends Controller
{
    public function index()
    {
        $user = Auth::user();  // Get the authenticated user

        return response()->json([
            'message' => 'This is a protected route',
            'user' => $user
        ]);
    }
}
