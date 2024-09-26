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
        Schema::table('tbl_submitted_artworks', function (Blueprint $table) {
            $table->boolean('isdel')->default(false);  // Add isdel column to track deletion
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tbl_submitted_artworks', function (Blueprint $table) {
            $table->dropColumn('isdel');  // Remove isdel column on rollback
        });
    }
};
