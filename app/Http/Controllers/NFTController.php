<?php

namespace App\Http\Controllers;

use Inertia\Inertia; // Import Inertia for React integration
use App\Models\MintedNft; // Assuming your NFT model is named MintedNft
use Illuminate\Http\Request;
use App\Models\AuctionNFT;  // Correct import for the model
use App\Models\BiddingPrice; 
class NFTController extends Controller
{
    public function myNFTs()
    {
        // Fetch NFTs where the user_id matches the authenticated user's ID
        $nfts = MintedNft::where('user_id', auth()->id())
            ->select('id', 'name', 'artist_name', 'medium', 'size', 'material', 'completion_date','price', 'ipfs_hash', 'image_hash', 'minted_by', 'created_at', 'transaction_hash', 'is_open_auction')
            ->get(); // Make sure to select relevant fields for display

        // Pass the NFTs to the Inertia view
        return Inertia::render('Art/MyNFTs', [
            'nfts' => $nfts,
        ]);
    }

    public function details($id)
    {
        $nft = MintedNft::findOrFail($id);
        $auctionData = AuctionNFT::where('minted_nft_id', $id)->first(); // Assuming auction is linked to NFT
        
        $bids = collect(); // Initialize an empty collection for bids
        
        if ($auctionData) {
            // Only attempt to fetch bids if auctionData exists
            $bids = BiddingPrice::where('auction_nft_id', $auctionData->id)
                ->with('user')  // This ensures that the user data is fetched
                ->get();
        }
        
        return Inertia::render('Art/NFTDetails', [
            'nft' => $nft,
            'auctionData' => $auctionData,
            'bids' => $bids, // Pass bids to the view
        ]);
    }
    
}
