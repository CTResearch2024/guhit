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
        Schema::create('artist_verifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Reference to the user requesting verification
            $table->string('portfolio_url')->nullable(); // Optional link to the artist's portfolio
            $table->string('identification_document')->nullable(); // Path to the uploaded identification document
            $table->text('artist_background')->nullable(); // Background description provided by the artist
            $table->unsignedBigInteger('status_id'); // Reference to tbl_status_submitted_artworks table for status
            $table->text('admin_feedback')->nullable(); // Optional feedback from the admin
            $table->timestamps();

            // Foreign key constraint for users
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            // Foreign key constraint for statuses
            $table->foreign('status_id')->references('id')->on('tbl_status_submitted_artworks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artist_verifications');
    }
};
