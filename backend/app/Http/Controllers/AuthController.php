<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $user = new User;
        $user->email = $request->input('email');
        $user->name = $request->input('name');
        $user->password = Hash::make($request->password);

        $result = User::where('email', $request->input('email'))->get();
        if (!$result->isEmpty()) {
            return response()->json(['success' => false, 'message' => 'email already exists']);
        } else {
            $saved = $user->save();
            return response()->json(['success' => $saved]);
        }
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }
        return response()->json(['success'=>true, 'user'=>User::where('email', $request->input('email'))->first()]);
        $request->session()->regenerate();
        
        
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['success'=>true]);
    }
}
