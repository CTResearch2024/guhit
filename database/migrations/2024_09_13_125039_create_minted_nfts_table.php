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
        Schema::create('minted_nfts', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Artwork title
            $table->string('artist_name'); // Artist name
            $table->string('medium'); // Medium used
            $table->string('size'); // Size (e.g., '2.45 x 2.45 cm')
            $table->string('material'); // Material used
            $table->date('completion_date'); // Date of completion
            $table->string('ipfs_hash'); // IPFS hash for the metadata
            $table->string('image_hash')->nullable(); // Optional: IPFS image hash (if you want to store separately)
            $table->string('minted_by'); // User address who minted the NFT
            $table->string('contract_address'); // Contract address (ArtNFT contract)
            $table->string('token_id'); // NFT token ID
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('minted_nfts');
    }
};
