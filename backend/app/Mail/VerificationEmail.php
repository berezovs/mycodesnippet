<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class VerificationEmail extends Mailable
{
    use Queueable, SerializesModels;


    public $user;
    public $pin;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, $pin)
    {

        $this->user = $user;
        $this->pin = $pin;
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('verify@mycodesnippet.net', 'Mycodesnippet')->subject('email verification')->view('emails.verify')->with(['pin' => $this->pin, 'url' => 'http://localhost:3000/account/email/verify?email=' . $this->user->email]);
    }
}
