<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\RequestBadgeRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class RequestBadgeCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class RequestBadgeCrudController extends CrudController
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
        CRUD::setModel(\App\Models\RequestBadge::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/request-badge');
        CRUD::setEntityNameStrings('request badge', 'request badges');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::setFromDb(); // Set columns from the db
    
        // Make the identification document a clickable link
        CRUD::modifyColumn('identification_document', [
            'name' => 'identification_document',
            'label' => 'Identification Document',
            'type' => 'closure',
            'function' => function($entry) {
                if ($entry->identification_document) {
                    $url = url('storage/' . $entry->identification_document);
                    return '<a href="' . $url . '" target="_blank" style="color: blue; text-decoration: underline;">' . basename($entry->identification_document) . '</a>';
                }
                return '-';
            },
            'escaped' => false, // Prevent escaping HTML to ensure the link works
        ]);
    
        // Add a column to show the social media platforms and URLs related to the request badge's user
        CRUD::addColumn([
            'name' => 'social_media_info',
            'label' => 'Social Media Accounts',
            'type' => 'closure',
            'value' => function($entry) {
                return $entry->socialMediaAccounts->map(function($account) {
                    return $account->platform . ' (<a href="' . $account->url . '" target="_blank" style="color: blue; text-decoration: underline;">' . $account->url . '</a>)';
                })->implode('<br>');
            },
            'escaped' => false, // Prevent escaping HTML to ensure links work
        ]);

        CRUD::addColumn([
            'name' => 'actions',
            'label' => 'Actions',
            'type' => 'closure',
            'function' => function($entry) {
                $approveUrl = url('admin/request-badge/' . $entry->id . '/approve');
                return '<a href="' . $approveUrl . '" class="btn btn-sm btn-link"><i class="la la-check"></i> Approve</a>';
            },
            'escaped' => false, // Ensure HTML is not escaped so that the button is rendered correctly
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
        CRUD::setValidation(RequestBadgeRequest::class);
        CRUD::setFromDb(); // set fields from db columns.

        /**
         * Fields can be defined using the fluent syntax:
         * - CRUD::field('price')->type('number');
         */
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


    public function approve($id)
{
    $requestBadge = \App\Models\RequestBadge::find($id);
    
    if ($requestBadge) {
        // Set the status to 2 (approved)
        $requestBadge->status_id = 2;
        $requestBadge->save();

        // Update the is_verified column in the users table
        $user = \App\Models\User::find($requestBadge->user_id);
        if ($user) {
            $user->is_verified = 1; // Set is_verified to true
            $user->save();
        }

        \Alert::success('Request Badge Approved and User Verified')->flash();
    } else {
        \Alert::error('Request Badge Not Found')->flash();
    }

    return redirect()->back();
}

    
}
