<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\SubmittedArtworkRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Illuminate\Support\Facades\Http;


/**
 * Class SubmittedArtworkCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class SubmittedArtworkCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    // use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
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
        CRUD::setModel(\App\Models\SubmittedArtwork::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/submitted-artwork');
        CRUD::setEntityNameStrings('submitted artwork', 'submitted artworks');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        // Define the user relationship column
        CRUD::addColumn([
            'name' => 'user_id',
            'label' => 'Submitted By',
            'type' => 'select',
            'entity' => 'user',
            'attribute' => 'name',
            'model' => "App\Models\User",
        ]);
    
        // Define the image column
        CRUD::addColumn([
            'name' => 'image_name',
            'label' => "Image",
            'type' => 'image',
            'prefix' => 'storage/',
            'height' => '80px',
            'width' => '80px',
        ]);
    
        CRUD::addColumn([
            'name' => 'status_id',
            'label' => 'Status',
            'type' => 'custom_html',
            'value' => function ($entry) {
                $status = $entry->status->status; // Assuming 'status' is the relationship name
                $color = '';
        
                switch ($status) {
                    case 'Pending':
                        $color = 'warning';
                        break;
                    case 'Approved':
                        $color = 'success';
                        break;
                    case 'Rejected':
                        $color = 'danger';
                        break;
                    default:
                        $color = 'secondary';
                        break;
                }
        
                return "<span class='badge badge-$color'>$status</span>";
            },
        ]);
        

    
        // Add the created_at column
        CRUD::addColumn([
            'name' => 'created_at',
            'label' => 'Created At',
            'type' => 'datetime',
        ]);
    
        // Remove the "Edit" and "Delete" buttons
        CRUD::removeButton('update'); // Removes the "Edit" button
        CRUD::removeButton('delete'); // Removes the "Delete" button
    }
    
    
    

    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    // protected function setupCreateOperation()
    // {
    //     CRUD::setValidation(SubmittedArtworkRequest::class);
    
    //     CRUD::field('user_id')->type('select')->label('User')->entity('user')->model('App\Models\User')->attribute('name');
    //     CRUD::field('image_name')->type('upload')->label('Image')->upload(true);
    //     CRUD::field('status_id')->type('select')->label('Status')->entity('status')->model('App\Models\StatusSubmittedArtwork')->attribute('status');
    // }
    

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    // protected function setupUpdateOperation()
    // {
    //     $this->setupCreateOperation();
    // }

    protected function setupShowOperation()
    {
        // Define the user relationship column
        CRUD::addColumn([
            'name' => 'user_id',
            'label' => 'Submitted By',
            'type' => 'select',
            'entity' => 'user',
            'attribute' => 'name',
            'model' => "App\Models\User",
        ]);
    
        // Define the image column
        CRUD::addColumn([
            'name' => 'image_name',
            'label' => "Image",
            'type' => 'image',
            'prefix' => 'storage/',
            'height' => '80px',
            'width' => '80px',
        ]);
    
        CRUD::addColumn([
            'name' => 'status_id',
            'label' => 'Status',
            'type' => 'custom_html',
            'value' => function ($entry) {
                $status = $entry->status->status; // Assuming 'status' is the relationship name
                $color = '';
        
                switch ($status) {
                    case 'pending':
                        $color = 'badge-warning';
                        break;
                    case 'approved':
                        $color = 'badge-success';
                        break;
                    case 'rejected':
                        $color = 'badge-danger';
                        break;
                    default:
                        $color = 'badge-secondary';
                        break;
                }
        
                return "<span class='badge $color'>$status</span>";
            },
        ]);
        
        
        
    
        // Add the created_at column
        CRUD::addColumn([
            'name' => 'created_at',
            'label' => 'Created At',
            'type' => 'datetime',
        ]);
    
        // Remove the "Edit" and "Delete" buttons on the show operation
        CRUD::removeButton('update'); // Removes the "Edit" button
        CRUD::removeButton('delete'); // Removes the "Delete" button
    
        // Adding the verification, approve, and reject buttons
        CRUD::addButtonFromView('line', 'verify', 'verify_button', 'end');
        CRUD::addButtonFromView('line', 'approve', 'approve_button', 'end');
        CRUD::addButtonFromView('line', 'reject', 'reject_button', 'end');
    }
    
    

    public function verify($id)
    {
        $artwork = $this->crud->getEntry($id);
    
        // The image path stored in the database
        $imagePath = $artwork->image_name;
    
        // Construct the full path to the image
        $fullImagePath = storage_path('app/public/' . $imagePath);
    
        // Upload the image to Imgur and get the URL
        $response = Http::withHeaders([
            'Authorization' => 'Client-ID 813d10229149507'
        ])->attach('image', fopen($fullImagePath, 'r'), basename($imagePath))
          ->post('https://api.imgur.com/3/image');
    
        if ($response->successful()) {
            $imageUrl = $response->json('data.link');
    
            // Perform the search via Google Lens using SerpApi
            $searchResponse = Http::get('https://serpapi.com/search', [
                'engine' => 'google_lens',
                'url' => $imageUrl,
                'api_key' => '95453a2cf5aba18fe271f3f29d98ad007d719159b7c899cb4ed05ca206bb49e0', // Replace with your actual SerpApi key
            ]);
    
            $similarImages = $searchResponse->json('visual_matches');
    
            // Pass the similar images to a view
            return view('admin.verify_artwork', compact('artwork', 'imageUrl', 'similarImages'));
        } else {
            return redirect()->back()->withErrors('Image upload failed: ' . $response->json('message'));
        }
    }

    public function approve($id)
    {
        $artwork = $this->crud->getEntry($id);
        $artwork->status_id = 2; // Assuming 2 is 'approved'
        $artwork->save();
    
        \Alert::success('Artwork approved successfully.')->flash();
        return redirect()->to($this->crud->route);
    }
    
    public function reject($id)
    {
        $artwork = $this->crud->getEntry($id);
        $artwork->status_id = 3; // Assuming 3 is 'rejected'
        $artwork->save();
    
        \Alert::error('Artwork rejected successfully.')->flash();
        return redirect()->to($this->crud->route);
    }
    
      
}
