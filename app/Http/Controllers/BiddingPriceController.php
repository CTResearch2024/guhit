<?php

namespace App\Http\Controllers;

use App\Models\BiddingPrice;
use App\Models\AuctionNFT;
use Illuminate\Http\Request;
use Inertia\Inertia; 
class BiddingPriceController extends Controller
{
    /**
     * Store a new bid in the database.
     */
    public function store(Request $request, $auctionId)
    {
        $request->validate([
            'bid_amount' => 'required|numeric|min:1',
        ]);

        // Store the bid
        BiddingPrice::create([
            'auction_nft_id' => $auctionId,
            'user_id' => auth()->id(),
            'bid_amount' => $request->bid_amount,
        ]);

        return redirect()->back()->with('success', 'Your bid has been placed!');
    }

    /**
     * Display all bids for a given auction.
     */
    public function index($auctionNftId)
    {
        // Retrieve all bids for the given auction
        $bids = BiddingPrice::where('auction_nft_id', $auctionNftId)->orderBy('bid_amount', 'desc')->get();

        return view('bids.index', compact('bids'));
    }
}
