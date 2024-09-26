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
        Schema::table('nft_settings', function (Blueprint $table) {
            $table->dropColumn('fees');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('nft_settings', function (Blueprint $table) {
            $table->decimal('fees', 8, 2)->nullable(); 
        });
    }
};
