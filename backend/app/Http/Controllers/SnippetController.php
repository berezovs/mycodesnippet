<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Snippet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SnippetController extends Controller
{
    //
    public function store(User $user, Request $request)
    {

        $snippet = new Snippet;
        $snippet->user_id = $request->input('user');
        $snippet->name = $request->input('name');
        $snippet->language = $request->input('language');
        $snippet->code = $request->input('code');
        $snippet->user_id = $user->id;
        $result = $snippet->save();

        if ($result) {
            return response()->json(['result' => $result], 200);
        } else {
            return response()->json(['result' => 'operation failed'], 500);
        }
    }

    public function index($user)
    {
        $snippets = Snippet::where('user_id', $user)->get();
        return response()->json($snippets);
    }

    public function delete(User $user, Snippet $snippet)
    {
        Snippet::destroy($snippet->id);
        return response()->json(["success" => true], 200);
    }

    public function update(User $user, Snippet $snippet, Request $request)
    {
        Log::debug([$snippet, $request->name, $request->code]);
        $snippet->fill(['name' => $request->name, 'code' => $request->code])->save();
        return response()->json(["success" => true], 200);
    }
}
