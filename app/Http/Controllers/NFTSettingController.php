<?php

namespace App\Http\Controllers;

use App\Models\NFTSetting;
use Illuminate\Http\Request;

class NFTSettingController extends Controller
{
    public function getSettings()
    {
        // Fetch the first record of NFT settings
        $nftSettings = NFTSetting::first(); // Adjust this to match your table structure
        
        if ($nftSettings) {
            return response()->json([
                'mint_contract_address' => $nftSettings->mint_contract_address,
                'token_contract_address' => $nftSettings->token_contract_address,
                'token_fee' => $nftSettings->token_fee, // If you need token_fee too
            ]);
        } else {
            return response()->json(['error' => 'NFT settings not found'], 404);
        }
    }


}
