<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestBadge extends Model
{
    use CrudTrait;
    use HasFactory;

    /*
    |--------------------------------------------------------------------------
    | GLOBAL VARIABLES
    |--------------------------------------------------------------------------
    */

    use CrudTrait;
    use HasFactory;

    protected $table = 'artist_verifications';
    protected $guarded = ['id'];

    // Define relationship with the SocialMediaAccount model
    public function socialMediaAccounts()
    {
        return $this->hasMany(SocialMediaAccount::class, 'user_id', 'user_id');
    }

    public function approveBadge()
{
    return '<a class="btn btn-sm btn-link" href="' . url('admin/request-badge/' . $this->id . '/approve') . '">Approve</a>';
}


    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | ACCESSORS
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | MUTATORS
    |--------------------------------------------------------------------------
    */
}
