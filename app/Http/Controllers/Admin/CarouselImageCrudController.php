<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CarouselImageRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class CarouselImageCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class CarouselImageCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     * 
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\CarouselImage::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/carousel-image');
        CRUD::setEntityNameStrings('carousel image', 'carousel images');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
protected function setupListOperation()
{
    // Display image instead of image path
    CRUD::addColumn([
        'name' => 'image_path', 
        'label' => 'Image',
        'type' => 'image', // This will display the image
        'prefix' => 'storage/', // Prefix for the public URL (public/storage)
        'height' => '100px',
        'width' => '100px',
    ]);

    // Alt Text column
    CRUD::addColumn([
        'name' => 'alt_text', 
        'label' => 'Alt Text',
        'type' => 'text',
    ]);
}

    protected function setupShowOperation()
{
    $this->crud->setFromDb(); // automatically sets fields from the database

    // Modify the image_path field to display the actual image
    $this->crud->modifyColumn('image_path', [
        'name' => 'image_path',
        'label' => 'Image', 
        'type' => 'image',
        'prefix' => 'storage/',  // Assuming images are stored in the storage/app/public directory
        'height' => '100px',
        'width' => '100px',
    ]);
}


    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(CarouselImageRequest::class);
        
        CRUD::addField([
            'name' => 'image_path',
            'label' => 'Carousel Image',
            'type' => 'upload',
            'upload' => true,
            'disk' => 'public',  // Save in the 'public' disk
            'destination' => 'carousels',  // Folder to store the images
        ]);
    
        CRUD::addField([
            'name' => 'alt_text',
            'label' => 'Alt Text',
            'type' => 'text',
        ]);
    }
    
    

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
