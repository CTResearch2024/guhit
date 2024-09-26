<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactCategory extends Model
{
    use HasFactory;

    protected $table = 'contact_categories';
    protected $fillable = ['name', 'default_message'];
}
