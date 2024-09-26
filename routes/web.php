<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ArtController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\SubmittedArtwork;
use App\Http\Controllers\AdminAuthenticatedSessionController;
use App\Models\ContactCategory;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AdminNFTSettingCrudController;
use App\Http\Controllers\NFTSettingController;
use App\Http\Controllers\NFTController;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\SubmittedArtworkController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Models\User;
use App\Models\MintedNft;
use App\Http\Controllers\CarouselController;
use App\Models\CarouselImage;
use App\Http\Controllers\Web3\WalletLoginController;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\ArtistVerificationController;
use App\Http\Controllers\AuctionController;
use App\Http\Controllers\BiddingPriceController;
use App\Models\BiddingPrice;
Route::post('/auction/{id}/bid', [BiddingPriceController::class, 'store'])->name('bids.store');
Route::get('/auction/{id}/bids', [BiddingPriceController::class, 'index'])->name('bids.index');

Route::post('/auction/start/{id}', [AuctionController::class, 'start'])->name('auction.start');
Route::get('/nft/details/{id}', [NFTController::class, 'details'])->name('nft.details');

Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
Route::get('/wallet-auth-signature-message', [WalletLoginController::class, 'getSignatureMessage']);
Route::post('/wallet-auth', [WalletLoginController::class, 'authenticate']);
Route::post('/register-wallet', [WalletRegistrationController::class, 'register']);

Route::get('/storage/{filename}', function ($filename) {
    return Storage::response('artworks/' . $filename);
});

Route::put('/update-artwork-status/{id}', [ArtController::class, 'updateStatus']);

Route::delete('/artworks/{id}/delete', [SubmittedArtworkController::class, 'delete'])->name('artworks.delete');
Route::post('/artworks/{id}/restore', [SubmittedArtworkController::class, 'restore'])->name('artworks.restore');
Route::get('/', function () {
    $users = User::all();
    $carouselImages = CarouselImage::all();
    $nfts = MintedNft::all();
    $openAuctionNfts = MintedNft::where('is_open_auction', 1)->select('id', 'name', 'artist_name', 'image_hash', 'material', 'size', 'transaction_hash')->get();


    // Fetch all bids and load user relationship
    $bids = BiddingPrice::with('user', 'auction')->get();

    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'users' => $users,
        'carouselImages' => $carouselImages,
        'nfts' => $nfts,
        'openAuctionNfts' => $openAuctionNfts,
        'bids' => $bids
    ]);
});
Route::get('/admin/withdraw', [NFTSettingCrudController::class, 'showWithdrawPage'])->name('admin.withdrawFunds')->middleware('admin');
Route::get('/nft-settings', [NFTSettingController::class, 'getSettings'])->name('nft-settings');

Route::get('/contact-categories', function () {
    return ContactCategory::all();
});

Route::post('/contact', [ContactController::class, 'handleContactForm']);

Route::get('/contact', function () {
    return Inertia::render('ContactUs');
})->name('contact');

Route::get('/announcements', function () {
    return Inertia::render('Announcements');
})->name('announcements');

Route::get('/events', function () {
    return Inertia::render('Events');
})->name('events');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/upload-art', [ArtController::class, 'create'])->name('upload.art');
    Route::post('/upload-art', [ArtController::class, 'checkAuthenticity'])->name('upload.art.check');
    Route::get('/my-artworks', [ArtController::class, 'myArtworks'])->name('my.artworks');
    Route::get('/mint/{artworkId}', [ArtController::class, 'mint'])->name('mint.artwork');
    Route::post('/mint-artwork', [ArtController::class, 'processMinting'])->name('process.minting');
    Route::get('/my-nfts', [NFTController::class, 'myNFTs'])->name('my-nfts');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/get-verified', [VerificationController::class, 'showGetVerified'])->name('verification.page');
    Route::post('/verification-submit', [VerificationController::class, 'store'])->name('verification.submit');
    Route::post('/artist-verification', [ArtistVerificationController::class, 'store'])->name('artist-verification.store');




});
Route::get('/auction/{id}', [AuctionController::class, 'showAuctionForm'])->name('auction.show');

Route::post('/auction/start/{id}', [AuctionController::class, 'start'])->name('auction.start');
Route::post('/admin/upload-image', function (Request $request) {
    // Retrieve the image path from the request or your database
    $imagePath = $request->input('image_path'); // This should be provided by the admin interface or passed from the controller

    if (!$imagePath) {
        return response()->json([
            'status' => 'error',
            'message' => 'Image path not provided',
        ], 400);
    }

    // Get the full path to the image file
    $fullImagePath = storage_path('app/public/' . $imagePath);

    // Check if the file exists
    if (!file_exists($fullImagePath)) {
        return response()->json([
            'status' => 'error',
            'message' => 'Image file not found',
        ], 404);
    }

    // Open the file for uploading
    $imageData = fopen($fullImagePath, 'r');

    // Upload to Imgur
    $response = Http::withHeaders([
        'Authorization' => 'Client-ID 813d10229149507' // Replace with your actual Imgur Client ID
    ])->attach('image', $imageData, basename($imagePath))
      ->post('https://api.imgur.com/3/image');

    if ($response->successful()) {
        return response()->json([
            'status' => 'success',
            'url' => $response->json('data.link'),
        ]);
    } else {
        return response()->json([
            'status' => 'error',
            'message' => 'Image upload failed',
        ], 500);
    }
});



Route::post('/submit-artwork', function (Request $request) {
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'image' => 'required|image|max:2048', 
    ]);

   
    $imagePath = $request->file('image')->store('artworks', 'public');

    
    SubmittedArtwork::create([
        'user_id' => $request->input('user_id'),
        'image_name' => $imagePath,
        'status_id' => 1, 
    ]);

    return response()->json(['status' => 'success']);
});

Route::get('/search', [SearchController::class, 'search'])->name('search');
// routes/web.php or routes/admin.php
// routes/web.php

Route::get('/admin/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');

require __DIR__.'/auth.php';
