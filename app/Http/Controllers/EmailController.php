<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class EmailController extends Controller
{
    public function contact(Request $request){
        $subject = "Contacto";
        $for = "daniel@prosystem.mx";

        Mail::send('email', function($message) use($subject,$for){
            $msj->from($email,$name);
            $msj->subject($subject);
            $msj->to($for);
        });
        return redirect()->back();
    }
}
