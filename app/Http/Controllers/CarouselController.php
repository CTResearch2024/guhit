<?php

namespace App\Http\Controllers;

use App\Models\CarouselImage;
use App\Models\User;
use App\Models\MintedNft; 
use Inertia\Inertia;

class CarouselController extends Controller
{
    public function index()
    {
        // Fetch all carousel images and NFTs
        $carouselImages = CarouselImage::all();
        $nfts = MintedNft::all();
        
        // Pass the records to the Index component
        return Inertia::render('Index', [
            'carouselImages' => $carouselImages,
            'nfts' => $nfts, // Pass all NFTs to the view
        ]);
    }
}
