<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArtistVerification extends Model
{
    use HasFactory;

    // Define which columns can be mass-assigned
    protected $fillable = [
        'user_id',
        'portfolio_url',
        'identification_document',
        'artist_background',
        'status_id',
        'admin_feedback',
    ];

    // Relationships (if needed)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
