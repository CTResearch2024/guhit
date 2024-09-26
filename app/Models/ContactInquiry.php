<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Backpack\CRUD\app\Models\Traits\CrudTrait;


class ContactInquiry extends Model
{
    use HasFactory;
    use CrudTrait;

    protected $table = 'contact_inquiries';

    protected $fillable = ['name', 'email', 'subject', 'message', 'contact_category_id'];

    public function category()
    {
        return $this->belongsTo(ContactCategory::class, 'contact_category_id');
    }
}
