<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class UserCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup()
    {
        CRUD::setModel(\App\Models\User::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/user');
        CRUD::setEntityNameStrings('user', 'users');
    }

    protected function setupListOperation()
    {
        CRUD::setFromDb(); 

        CRUD::column('name');
        CRUD::column('email');
        CRUD::column('role_id')->type('select')->label('Role')
            ->entity('role')
            ->attribute('name')
            ->model('App\Models\Role');
    }

    protected function setupCreateOperation()
    {
        CRUD::setValidation(UserRequest::class);
        CRUD::setFromDb();

        CRUD::field('name');
        CRUD::field('email');
        CRUD::field('password')->type('password');
        CRUD::field('role_id')->type('select')->label('Role')
            ->entity('role')
            ->attribute('name')
            ->model('App\Models\Role');
    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }

    // Define the show operation
    protected function setupShowOperation()
    {
        CRUD::column('name');
        CRUD::column('email');
        CRUD::column('username');
        CRUD::column('wallet_address');
        
        // Display the profile image
        CRUD::addColumn([
            'name' => 'profile_image',
            'label' => 'Profile Image',
            'type' => 'image',
            'prefix' => 'storage/', // assuming your profile images are stored in the 'storage' directory
            'height' => '80px',
            'width' => '80px',
        ]);
        
        CRUD::column('is_verified')->type('boolean');
        CRUD::column('created_at');
        CRUD::column('updated_at');
    }
}
