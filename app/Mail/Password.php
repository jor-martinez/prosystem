<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Password extends Mailable
{
    use Queueable, SerializesModels;

    //public $clave;

    public function __construct()
    {
        //$this->clave = $clave;
    }

    public function build()
    {
        $from = "clave@gmail.com";
        $name = "admin";
        $subject = "recuperación de contraseña";
        return $this->view('dev.recuperacion')->from($from,
            $name)->subject($subject);
    }
}
