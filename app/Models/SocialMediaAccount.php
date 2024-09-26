<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialMediaAccount extends Model
{
    use HasFactory;

    protected $table = 'social_media_accounts';
    protected $guarded = ['id'];

    // Define inverse relationship with the RequestBadge (User)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
