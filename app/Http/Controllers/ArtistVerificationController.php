<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\ArtistVerification;
use App\Models\SocialMediaAccount; 

class ArtistVerificationController extends Controller
{
    public function store(Request $request)
    {
        // Validate the inputs including social media
        $request->validate([
            'portfolio_url' => 'required|url',
            'identification_document' => 'required|file',
            'facebook' => 'nullable|url',
            'twitter' => 'nullable|url',
            'instagram' => 'nullable|url',
            'linkedin' => 'nullable|url',
            'tiktok' => 'nullable|url',
        ]);

        // Store the artist verification data
        $verification = ArtistVerification::create([
            'user_id' => auth()->user()->id,
            'portfolio_url' => $request->portfolio_url,
            'identification_document' => $request->file('identification_document')->store('identifications'),
            'artist_background' => $request->artist_background,
            'status_id' => 1, // Default to "Pending"
        ]);

        // Handle social media accounts
        $socialMediaAccounts = [
            'facebook' => $request->facebook,
            'twitter' => $request->twitter,
            'instagram' => $request->instagram,
            'linkedin' => $request->linkedin,
            'tiktok' => $request->tiktok,
        ];

        // Insert social media links into the social_media_accounts table
        foreach ($socialMediaAccounts as $platform => $url) {
            if ($url) { // Only insert if the URL is provided
                SocialMediaAccount::create([
                    'user_id' => auth()->user()->id,
                    'platform' => $platform,
                    'url' => $url,
                ]);
            }
        }

        // Redirect or return success response
        return redirect()->back()->with('message', 'Verification submitted successfully!');
    }
}
