<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Sharp;

class ImageMetadataController extends Controller
{
    public function getMetadata(Request $request)
    {
        $imageName = $request->input('imageName');
        $imagePath = storage_path('app/public/' . $imageName);  // Adjust the path to match your image storage

        if (!file_exists($imagePath)) {
            return response()->json(['error' => 'Image not found'], 404);
        }

        try {
            $metadata = Sharp::metadata($imagePath);  // Use Sharp to get the metadata
            $dpi = $metadata['density'] ?? 96;  // Default to 96 DPI if not found

            return response()->json([
                'dpi' => $dpi,
                'width' => $metadata['width'],
                'height' => $metadata['height'],
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching metadata'], 500);
        }
    }
}
