<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SnippetController extends Controller
{
    //
    public function store(Request $request)
    {
        return response()->json(['data' => $request->input('snippet')]);
    }
}
