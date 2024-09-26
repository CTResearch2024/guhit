<?php

use Illuminate\Support\Facades\Route;

// --------------------------
// Custom Backpack Routes
// --------------------------
// This route file is loaded automatically by Backpack\CRUD.
// Routes you generate using Backpack\Generators will be placed here.
Route::get('/admin/submitted-artwork/{id}/verify', [\App\Http\Controllers\Admin\SubmittedArtworkCrudController::class, 'verify'])->name('submitted-artwork.verify');
Route::get('/admin/submitted-artwork/{id}/approve', [\App\Http\Controllers\Admin\SubmittedArtworkCrudController::class, 'approve'])->name('submitted-artwork.approve');
Route::get('/admin/submitted-artwork/{id}/reject', [\App\Http\Controllers\Admin\SubmittedArtworkCrudController::class, 'reject'])->name('submitted-artwork.reject');
Route::get('/admin/request-badge/{id}/approve', [App\Http\Controllers\Admin\RequestBadgeCrudController::class, 'approve'])->name('request-badge.approve');

Route::group([
    'prefix' => config('backpack.base.route_prefix', 'admin'),
    'middleware' => array_merge(
        (array) config('backpack.base.web_middleware', 'web'),
        (array) config('backpack.base.middleware_key', 'admin')
    ),
    'namespace' => 'App\Http\Controllers\Admin',
], function () { // custom admin routes
    Route::crud('message', 'MessageCrudController');
    Route::crud('user', 'UserCrudController');
    Route::crud('submitted-artwork', 'SubmittedArtworkCrudController');
    Route::crud('role', 'RoleCrudController');
    Route::crud('n-f-t-setting', 'NFTSettingCrudController');
    Route::crud('message', 'MessageCrudController');
    Route::crud('carousel-image', 'CarouselImageCrudController');
    Route::crud('request-badge', 'RequestBadgeCrudController');
}); // this should be the absolute last line of this file

/**
 * DO NOT ADD ANYTHING HERE.
 */
