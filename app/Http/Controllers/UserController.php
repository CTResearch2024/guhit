<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        // Fetch all users from the database
        $users = User::all();

        // Return the users to the Welcome component
        return inertia('Index', [
            'users' => $users
        ]);
    }
}