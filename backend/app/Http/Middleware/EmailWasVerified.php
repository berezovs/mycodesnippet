<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmailWasVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)

    {

        if ($request->is('api/verify-email') || $request->is('api/resend-email')) {
            $user = User::where('email', $request->query('email'))->first();

            if ($user) {
                return $user->email_verified_at ? response()->json(['success' => false, "message" => "EMAIL_HAS_BEEN_VALIDATED_ALREADY"], 409) : $next($request);
            } else {
                return response()->json(['success' => false, "message" => "NON_EXISTENT_EMAIL"], 401);
            }
        } else {
            $user = User::where('email', $request->input('email'))->first();

            if ($user && $user->email_verified_at || auth()->user()->email_verified_at) {
                return $next($request);
            } else {
                return response()->json(['success' => false, 'code' => 'EMAIL_NOT_VERIFIED', 'message' => "You need to confirm your email first. Follow the instructions in the email we sent you or go to account/email/resend-pin to resend email"], 403);
            }
        }
    }
}
