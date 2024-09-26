<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CarouselImage extends Model
{
    use CrudTrait;
    use HasFactory;

    protected $table = 'carousel_images'; 

    protected $fillable = ['image_path', 'alt_text'];

    public function setImagePathAttribute($value)
    {
        $attribute_name = "image_path";
        $disk = "public";
        $destination_path = "carousels";
    
        // Check if it's an uploaded file (from a form)
        if (is_file($value)) {
            $filename = md5(time()) . '.' . $value->getClientOriginalExtension();
            $path = $value->storeAs($destination_path, $filename, $disk);
    
            // Store only the relative path to the database (not the full URL)
            $this->attributes[$attribute_name] = $path; // This will store carousels/image_name
        } else {
            // If it's not a file, just store the value directly
            $this->attributes[$attribute_name] = $value;
        }
    }
    

    

}