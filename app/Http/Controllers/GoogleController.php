<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GoogleController extends Controller
{
    public function redirectToGoogle(){
        return Socialite::driver('google')->redirect();
    }
    public function handleGoogleCallback(){
        $user = Socialite::driver('google')->user();
        $findUser = User::where('google_id', $user->id)->first();
        if($findUser){
            auth::login($findUser);
        }else{
            $user = User::updateOrCreate([
                'email' => $user->id,
            ], [
                'name' => $user->name,
                'google_id' => $user->token,
                'password' => $encrypt('12345678'),
            ]);
            Auth::login($user);
        }
        return redirect()->intended('home');
    }
}
