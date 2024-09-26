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
        Schema::table('minted_nfts', function (Blueprint $table) {
            $table->boolean('is_open_auction')->default(false)->after('user_id'); // Adjust the after clause if necessary
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('minted_nfts', function (Blueprint $table) {
            $table->dropColumn('is_open_auction');
        });
    }
};
