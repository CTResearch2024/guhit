<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::create('auction_nft', function (Blueprint $table) {
        //     $table->id();  // Primary Key
        //     $table->foreignId('minted_nft_id')->constrained('minted_nfts')->onDelete('cascade');  // Foreign Key to minted_nfts
        //     $table->decimal('initial_price', 10, 2);  // Initial Price for the auction
        //     $table->date('start_date');  // Auction Start Date
        //     $table->date('end_date');  // Auction End Date
        //     $table->decimal('highest_bid', 10, 2)->nullable();  // Highest bid for the auction (nullable initially)
        //     $table->foreignId('highest_bidder_id')->nullable()->constrained('users')->onDelete('set null');  // Foreign Key to the User who placed the highest bid
        //     $table->foreignId('status_id')->constrained('auction_status')->onDelete('restrict');  // Status ID linked to auction_status
        //     $table->foreignId('created_by')->constrained('users')->onDelete('cascade');  // User who created the auction
        //     $table->string('transaction_hash')->nullable();  // Transaction hash for completed auctions
        //     $table->timestamps();  // Created at and Updated at timestamps
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auction_nft');
    }
};
