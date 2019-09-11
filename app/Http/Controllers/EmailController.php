<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\Contacto;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function enviar(Request $request){
        $remitente = $request -> email;
        $contenido = $request -> msg;
        $persona = $request -> name;

        Mail::send('contacto', ['contenido' => $contenido], function ($contacto) use($remitente, $contenido, $persona) {
            $contacto->from($remitente, $persona);
            $contacto->to('daniel@prosystem.mx');
            $contacto->subject('Nuevo contacto desde ProSystem');
        });

        return response()->json(['status' => 200, 'message' => 'Envio exitoso']);
    }
}
