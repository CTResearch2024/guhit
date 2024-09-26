<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiddingPrice extends Model
{
    use HasFactory;

    protected $fillable = ['auction_nft_id', 'user_id', 'bid_amount'];

    // Define the auction relationship
    public function auction()
    {
        return $this->belongsTo(AuctionNFT::class, 'auction_nft_id');
    }

    // Define the user relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
