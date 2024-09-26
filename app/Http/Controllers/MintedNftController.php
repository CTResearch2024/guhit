<?php

namespace App\Http\Controllers;

use App\Models\MintedNft;
use Illuminate\Http\Request;

class MintedNftController extends Controller
{
    public function storeMintedNft(Request $request)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string',
            'artist_name' => 'required|string',
            'medium' => 'required|string',
            'size' => 'required|string',
            'material' => 'required|string',
            'completion_date' => 'required|date',
            'price' => 'required|numeric|min:0',
            'ipfs_hash' => 'required|string',
            'image_hash' => 'required|string',
            'contract_address' => 'required|string',
            'token_id' => 'required|string',
            'transaction_hash' => 'required|string',
            
        ]);

        // Create a new MintedNft record
        MintedNft::create([
            'name' => $request->name,
            'artist_name' => $request->artist_name,
            'medium' => $request->medium,
            'size' => $request->size,
            'material' => $request->material,
            'completion_date' => $request->completion_date,
            'price' => $request->price,
            'ipfs_hash' => $request->ipfs_hash,
            'image_hash' => $request->image_hash,
            'minted_by' => $request->minted_by,
            'user_id' => auth()->id(),
            'contract_address' => $request->contract_address,
            'token_id' => $request->token_id,
            'transaction_hash' => $request->transaction_hash, // Adding transaction hash here
          
        ]);

        return response()->json(['message' => 'NFT Minted and Saved Successfully']);
    }
}
