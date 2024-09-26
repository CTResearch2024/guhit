<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');
        // Add your search logic here
        // For example, search for users or any other model
        $results = User::where('name', 'LIKE', "%{$query}%")->get();
        
        return view('search.results', compact('results'));
    }
}
