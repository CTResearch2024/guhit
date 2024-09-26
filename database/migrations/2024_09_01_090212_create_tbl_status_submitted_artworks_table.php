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
        Schema::create('tbl_status_submitted_artworks', function (Blueprint $table) {
            $table->id();
            $table->string('status')->unique();
            $table->timestamps();
        });

        DB::table('tbl_status_submitted_artworks')->insert([
            ['status' => 'pending'],
            ['status' => 'approved'],
            ['status' => 'rejected'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_status_submitted_artworks');
    }
};
