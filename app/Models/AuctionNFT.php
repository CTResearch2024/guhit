<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuctionNFT extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'auction_nft'; // Corresponds to the 'auction_nft' table

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'minted_nft_id',
        'initial_price',
        'start_date',
        'end_date',
        'status_id',
        'created_by',
    ];

    /**
     * Get the minted NFT associated with the auction.
     */
    public function mintedNFT()
    {
        return $this->belongsTo(MintedNft::class, 'minted_nft_id'); // Relationship with MintedNft
    }

    /**
     * Get the status of the auction.
     */
    public function status()
    {
        return $this->belongsTo(AuctionStatus::class, 'status_id'); // Relationship with AuctionStatus
    }

    /**
     * Get the user who created the auction.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by'); // Relationship with User who created it
    }

    public function bids()
{
    return $this->hasMany(BiddingPrice::class, 'auction_nft_id');
}
}
