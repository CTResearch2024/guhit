<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\MessageRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class MessageCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class MessageCrudController extends CrudController
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
        CRUD::setModel(\App\Models\ContactInquiry::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/message');
        CRUD::setEntityNameStrings('message', 'messages');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::setFromDb();

        if (backpack_user()->role_id === 2) {  // Admin
            CRUD::addClause('where', 'contact_category_id', '>', 0);  // Show all messages
        }
    
        // Moderator sees only Technical Support messages
        if (backpack_user()->role_id === 3) {  // Moderator
            CRUD::addClause('where', 'contact_category_id', 1);  // Only show Technical Support messages
        }
    
        // Content Manager sees only Content-Related messages
        if (backpack_user()->role_id === 4) {  // Content Manager
            CRUD::addClause('where', 'contact_category_id', 2);  // Only show Content-Related messages
        }
    }
    
    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    // protected function setupCreateOperation()
    // {
    //     CRUD::setValidation(MessageRequest::class);
    //     CRUD::setFromDb(); // set fields from db columns.

    //     /**
    //      * Fields can be defined using the fluent syntax:
    //      * - CRUD::field('price')->type('number');
    //      */
    // }

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(MessageRequest::class);
        CRUD::field('name');
        CRUD::field('email');
        CRUD::field('subject');
        CRUD::field('message');
        CRUD::field('contact_category_id')->type('relationship');
    }
}
