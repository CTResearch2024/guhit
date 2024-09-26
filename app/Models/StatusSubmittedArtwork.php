<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusSubmittedArtwork extends Model
{
    use HasFactory;

    protected $table = 'tbl_status_submitted_artworks'; 

    protected $fillable = [
        'status',
        'comment',
        'status_id',
    ];

    public function submittedArtworks()
    {
        return $this->hasMany(SubmittedArtwork::class, 'status_id', 'id');
    }
}
