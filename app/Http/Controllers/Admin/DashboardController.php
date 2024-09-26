<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        // Existing code for counting users
        $newMembersCount = User::where('role_id', 5)->count();
        $moderatorsCount = User::where('role_id', 2)->count();
        $contentManagersCount = User::where('role_id', 4)->count();
        $adminsCount = User::where('role_id', 1)->count();
        $mintedNftsCount = \App\Models\MintedNft::count();
        $submittedArtworksCount = \App\Models\SubmittedArtwork::count();
    
        // Count artworks by status
        $approvedArtworksCount = \App\Models\SubmittedArtwork::where('status_id', 2)->count(); // Approved
        $rejectedArtworksCount = \App\Models\SubmittedArtwork::where('status_id', 3)->count(); // Rejected
        $pendingArtworksCount = \App\Models\SubmittedArtwork::where('status_id', 1)->count(); // Pending (assuming 1 is pending)
    
        // Fetch the artworks grouped by submission date
        $artworkSubmissions = \App\Models\SubmittedArtwork::selectRaw('DATE(created_at) as date, COUNT(*) as submitted, 
            SUM(CASE WHEN status_id = 2 THEN 1 ELSE 0 END) as approved, 
            SUM(CASE WHEN status_id = 3 THEN 1 ELSE 0 END) as rejected, 
            SUM(CASE WHEN status_id = 4 THEN 1 ELSE 0 END) as minted')
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    
        return view('vendor.backpack.ui.dashboard', compact(
            'newMembersCount', 'moderatorsCount', 'contentManagersCount', 'adminsCount', 
            'mintedNftsCount', 'submittedArtworksCount', 
            'approvedArtworksCount', 'rejectedArtworksCount', 'pendingArtworksCount',
            'artworkSubmissions'
        ));
    }
    

}    
