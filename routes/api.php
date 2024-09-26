<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NFTSettingController;
use App\Http\Controllers\MintedNftController;
use App\Http\Controllers\Web3\WalletLoginController;
use App\Http\Controllers\ProtectedController;
use Tymon\JWTAuth\Facades\JWTAuth;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/wallet-auth', [WalletLoginController::class, 'login']);


Route::get('/nft-settings', [NFTSettingController::class, 'getSettings']);
Route::post('/minted-nfts', [MintedNftController::class, 'storeMintedNft']);
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/protected-route', [ProtectedController::class, 'index']);
});