<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 

class SubmittedArtwork extends Model
{
    use CrudTrait;
    use HasFactory;
    use SoftDeletes; 

    protected $table = 'tbl_submitted_artworks'; 

    protected $fillable = [
        'user_id',
        'image_name',
        'status_id',
        'created_at',
        'isdel',
        'deleted_at',  
    ];

    // Scope to exclude soft-deleted records by default
    public function scopeActive($query)
    {
        return $query->where('isdel', false);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function status()
    {
        return $this->belongsTo(StatusSubmittedArtwork::class, 'status_id');
    }
}


