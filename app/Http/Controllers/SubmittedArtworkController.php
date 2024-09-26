<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubmittedArtwork;

class SubmittedArtworkController extends Controller
{
    /**
     * Display a listing of the submitted artworks by the logged-in user.
     */
    public function index(Request $request)
    {
        $submittedArtworks = SubmittedArtwork::with('status')->where('user_id', auth()->id())->get();

        return inertia('Artworks/SubmittedArtworks', [
            'submittedArtworks' => $submittedArtworks,
        ]);
    }

    // Soft-delete an artwork (for 'pending' or 'rejected' statuses)
    public function delete($id)
    {
        $artwork = SubmittedArtwork::where('user_id', auth()->id())
                    ->where('id', $id)
                    ->first();

        if ($artwork && ($artwork->status_id == 1 || $artwork->status_id == 3)) {
            // Soft delete the artwork
            $artwork->isdel = true;
            $artwork->deleted_at = now(); // Set the current time for soft-delete
            $artwork->save(); // Save the changes
        }

        return redirect()->back()->with('message', 'Artwork has been successfully deleted.');
    }

    // Restore a soft-deleted artwork (admin feature, optional)
    public function restore($id)
    {
        $artwork = SubmittedArtwork::withTrashed()->findOrFail($id);
        $artwork->restore(); // Restore the soft-deleted artwork

        return redirect()->back()->with('message', 'Artwork has been restored.');
    }

}
