<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MintedNft extends Model
{
    use HasFactory;
    use CrudTrait;


    protected $table = 'minted_nfts'; 

    protected $fillable = [
        'name', 
        'artist_name', 
        'medium', 
        'size', 
        'material', 
        'completion_date', 
        'price',
        'ipfs_hash',
        'image_hash',
        'minted_by',
        'contract_address',
        'token_id', 
        'transaction_hash'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}
