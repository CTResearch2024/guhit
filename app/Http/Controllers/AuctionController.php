<?php

namespace App\Http\Controllers;

use Inertia\Inertia; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\MintedNFT; // Assuming you have an NFT model
use Illuminate\Support\Facades\DB;

class AuctionController extends Controller
{
    /**
     * Show the auction form for the given NFT.
     *
     * @param  int  $nft_id
     * @return \Illuminate\View\View
     */
    public function start(Request $request, $id)
    {
        // Find the minted NFT by id
        $nft = MintedNft::findOrFail($id);

        // Validate incoming request data
        $request->validate([
            'price' => 'required|numeric|min:1',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        // Insert into auction_nft table
        DB::table('auction_nft')->insert([
            'minted_nft_id' => $nft->id,
            'initial_price' => $request->price,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status_id' => 1, // Active status
            'created_by' => auth()->id(), // Assign the currently authenticated user
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Update the is_open_auction column in minted_nfts table
        $nft->update([
            'is_open_auction' => true
        ]);

        // Redirect back to the NFTs page with a success message
        return redirect()->route('my-nfts')->with('success', 'Auction started successfully!');
    }

    public function showAuctionForm($id)
    {
        $nft = MintedNft::findOrFail($id);
        return Inertia::render('Art/AuctionForm', [
            'nft' => $nft,
        ]);
    }
}
