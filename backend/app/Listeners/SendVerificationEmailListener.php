<?php

namespace App\Listeners;

use Carbon\Carbon;
use App\Models\User;
use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Events\SendVerificationEmail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendVerificationEmailListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\SendVerificationEmail  $event
     * @return void
     */
    public function handle(SendVerificationEmail $event)
    {

        //fires when event is called
        Log::debug("Hello world again");

        //lookup the user usin the email property attached to $event
        $user = User::where('email', $event->email)->first();

        //if found generate pin
        if ($user) {
            $digits = 6;
            $pin = rand(pow(10, $digits - 1), pow(10, $digits) - 1);
            //save pin in table
            DB::table("email_verification_pin")->insert([
                'pin' => $pin,
                'created_at' => Carbon::now(),
                'user_id' => $user->id,
            ]);
            //send email to user
            Mail::to($event->email)->send(new VerificationEmail($user, $pin));
        }
    }
}
