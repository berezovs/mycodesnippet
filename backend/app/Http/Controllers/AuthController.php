<?php

namespace App\Http\Controllers;

use App\Events\SendVerificationEmail;
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
            return response()->json(['success' => false, 'message' => 'This email is already in use'], 409);
        } else {
            $saved = $user->save();
            if ($saved) {
                SendVerificationEmail::dispatch($user->email);
                return response()->json(['success' => true]);
            } else {
                return response()->json(['success' => false], 500);
            }
        }
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }
        $token = $request->user()->createToken("API_TOKEN");

        return ['token' => $token->plainTextToken];
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['success' => true]);
    }
}
