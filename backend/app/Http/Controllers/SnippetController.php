<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Illuminate\Http\Request;

class SnippetController extends Controller
{
    //
    public function store(Request $request)
    {

        $snippet = new Snippet;
        $snippet->user_id = $request->input('user_id');
        $snippet->name = $request->input('name');
        $snippet->language = $request->input('language');
        $snippet->code = $request->input('code');

        $result = $snippet->save();

        if ($result) {
            return response()->json(['result' => $result], 200);
        } else {
            return response()->json(['result' => 'operation failed'], 500);
        }
    }

    public function index($user_id)
    {
        $snippets = Snippet::where('user_id', $user_id)->get();
        return response()->json($snippets);
    }
}
