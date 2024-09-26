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
        Schema::create('bidding_prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('auction_nft_id')->constrained('auction_nft')->onDelete('cascade'); // Link to auction_nft
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Link to users table
            $table->decimal('bid_amount', 12, 2); // Store bid amount (2 decimal places)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bidding_prices');
    }
};
