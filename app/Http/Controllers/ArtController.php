<?php

namespace App\Http\Controllers;

use Inertia\Inertia; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\SubmittedArtwork;


class ArtController extends Controller
{
    public function create()
    {
        return Inertia::render('Art/Upload');
    }

    public function checkAuthenticity(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $image = $request->file('image');
        $imagePath = $image->getRealPath();

        // Upload the image to SerpApi for Google Lens search
        $response = Http::asMultipart()->attach(
            'image', file_get_contents($imagePath), $image->getClientOriginalName()
        )->post('https://serpapi.com/search', [
            'engine' => 'google_lens',
            'api_key' => '95453a2cf5aba18fe271f3f29d98ad007d719159b7c899cb4ed05ca206bb49e0',
            'output' => 'json',
        ]);

        $data = $response->json();

        // Check if there are visual matches
        $visualMatches = $data['visual_matches'] ?? [];

        // Return the result with Inertia
        return Inertia::render('Upload', [
            'auth' => auth()->user(),
            'visualMatches' => $visualMatches,
            'success' => count($visualMatches) === 0 ? 'The image is authentic.' : null,
            'error' => count($visualMatches) > 0 ? 'The uploaded image is plagiarized.' : null,
        ]);
    }

    public function myArtworks()
    {
        $artworks = SubmittedArtwork::where('user_id', auth()->id())
                    ->where('isdel', false)
                    ->whereNull('deleted_at')  // Ensure it's not soft-deleted
                    ->with('status')
                    ->get();
    
        return Inertia::render('Art/MyArtworks', [
            'artworks' => $artworks->map(function ($artwork) {
                return [
                    'id' => $artwork->id,
                    'image_name' => $artwork->image_name,
                    'status' => $artwork->status->comment, 
                    'status_id' => $artwork->status_id, 
                    'created_at' => $artwork->created_at, 
                ];
            }),
        ]);
    }
    
    

    public function mint($artworkId)
    {
        $artwork = SubmittedArtwork::findOrFail($artworkId);

        // Ensure the artwork is approved
        if ($artwork->status_id != 2) {
            return redirect()->back()->with('error', 'Artwork must be approved before minting.');
        }

        return Inertia::render('Art/MintPage', [
            'artwork' => [
                'id' => $artwork->id,
                'image_name' => $artwork->image_name,
                // Add any other necessary fields here
            ]
        ]);
    }



    public function updateStatus($id, Request $request)
    {
        // Find the artwork by its ID
        $artwork = SubmittedArtwork::find($id);
        
        if (!$artwork) {
            return response()->json(['message' => 'Artwork not found'], 404);
        }
    
        // Update the status to 4 (minted)
        $artwork->status_id = 4;
        $artwork->updated_at = now();  // Optional: Update the timestamp
        $artwork->save();
    
        return response()->json(['message' => 'Artwork status updated successfully']);
    }
    

}
