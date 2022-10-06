<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Log\Logger;
use Illuminate\Http\Request;
use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Events\SendVerificationEmail;

class EmailVerificationController extends Controller
{
    public function send(Request $request)
    {
        SendVerificationEmail::dispatch($request->query('email'));
        return response()->json(['success' => true], 200);
    }

    public function verify(Request $request)
    {
        $email = $request->query('email');
        $user = User::where('email', $email)->first();
        if ($user) {
            $email_verification_details = DB::table('email_verification_pin')->where([
                ['user_id', '=', $user->id],
                ['pin', '=', $request->input('pin')]
            ]);

            if ($email_verification_details->get()->isNotEmpty() && Carbon::create($email_verification_details->first()->created_at)->addHour() > Carbon::now()) {
                //validate email by inserting current date in the email_verified_at field of the user record
                $user->email_verified_at  = Carbon::now();
                $user->save();
                //delete record in the email_verification_pin table
                $email_verification_details->delete();
                return response()->json(['success' => true], 200);
            } else {
                //let the user know email validation expired
                $email_verification_details->delete();
                return response()->json(['success' => false, 'message' => "Expired PIN"], 401);
            }
        } else {
            return response()->json(['success' => false], 403);
        }
    }
}
