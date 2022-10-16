<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Snippet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SnippetController extends Controller
{
    //
    public function store(Request $request)
    {
        if (Snippet::where("user_id", $request->input('user'))->count() >= 50)
            return response()->json(['success' => false, "code" => "MAX_NUMBER_EXCEEDED"], 500);

        $snippet = new Snippet;
        $snippet->user_id = $request->input('user');
        $snippet->name = $request->input('name');
        $snippet->language = $request->input('language');
        $snippet->code = $request->input('code');
        $snippet->user_id = auth()->user()->id;
        $result = $snippet->save();

        if ($result) {
            return response()->json(['success' => true], 200);
        } else {
            return response()->json(['success' => false, "code" => "DATABASE_ERROR"], 500);
        }
    }

    public function index()
    {
        $snippets = Snippet::where('user_id', auth()->user()->id)->get();
        return response()->json($snippets);
    }

    public function delete(Snippet $snippet)
    {
        Snippet::destroy($snippet->id);
        return response()->json(["success" => true], 200);
    }

    public function update(Snippet $snippet, Request $request)
    {


        $wasUpdated = $snippet->fill(['name' => $request->name, 'code' => $request->code])->save();
        if ($wasUpdated) {
            return response()->json(["success" => true, 'snippet' => Snippet::where('id', $request->id)->get()], 200);
        } else {
            return response()->json(['success' => false, "code" => "DATABASE_ERROR"], 500);
        }
    }
}
