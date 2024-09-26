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
            // Rename the existing contract_address to mint_contract_address
            $table->renameColumn('contract_address', 'mint_contract_address');
            
            // Add the new token_contract_address column
            $table->string('token_contract_address')->after('mint_contract_address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('nft_settings', function (Blueprint $table) {
            // Reverse the changes
            $table->renameColumn('mint_contract_address', 'contract_address');
            $table->dropColumn('token_contract_address');
        });
    }
};
