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
        Schema::create('nft_settings', function (Blueprint $table) {
            $table->id();
            $table->string('contract_address');
            $table->string('chain');
            $table->string('wallet_address');
            $table->decimal('fees', 8, 2); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nft_settings');
    }
};
