<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Events\SendVerificationEmail;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {


        $request->validate([
            'email' => 'required|email|max:255',
            'name' => 'required|max:255',
            'password' => ['required', Password::min(8)->letters()->mixedCase(), Password::min(8)->numbers(), Password::min(8)->symbols()]
        ]);

        $user = new User;
        $user->email = $request->input('email');
        $user->name = $request->input('name');
        $user->password = Hash::make($request->password);

        $result = User::where('email', $request->input('email'))->get();
        if (!$result->isEmpty()) {
            return response()->json(['success' => false, "code" => "EMAIL_ALREADY_EXISTS"], 409);
        } else {
            $saved = $user->save();
            if ($saved) {
                SendVerificationEmail::dispatch($user->email);
                return response()->json(['success' => true], 200);
            } else {
                return response()->json(['success' => false, "code" => "DATABASE_ERROR"], 500);
            }
        }
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'code' => 'INVALID_LOGIN_DETAILS'
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
