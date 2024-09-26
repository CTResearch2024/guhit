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
        DB::table('tbl_status_submitted_artworks')->insert([
            'status' => 'minted',
            'comment' => 'Your artwork has been minted as an NFT.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('tbl_status_submitted_artworks')->where('status', 'minted')->delete();
    }
};
