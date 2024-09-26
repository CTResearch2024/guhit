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
        Schema::table('users', function (Blueprint $table) {
            $table->string('profile_image')->nullable(); // Profile image URL
            $table->string('api_token', 80)->unique()->nullable(); // API token for authentication
            $table->timestamp('last_login_at')->nullable(); // Last login timestamp
            $table->string('nonce', 100)->nullable(); // Nonce for signature verification
            $table->decimal('balance', 18, 8)->default(0); // User's wallet balance
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('profile_image');
            $table->dropColumn('api_token');
            $table->dropColumn('last_login_at');
            $table->dropColumn('nonce');
            $table->dropColumn('balance');
        });
    }
};
