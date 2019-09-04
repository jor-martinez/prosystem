<?php

namespace App\Http\Controllers\Auth;
use App\Models\Clave;
use App\Models\Usuario;
use App\Mail\Contraseña;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use App\Http\Controllers\Controller;
use App\Utilidades\StringReplace;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\Password;

class ClaveController extends Controller
{
   
    public function index()
    {
        $claves = Clave::all();
        return view('auth.forgetpass', ['claves' => $claves]);
    }


    public function store(Request $request)
    {
        $usuarios = Usuario::all();
        return view('auth.refurbish', ['usuarios' => $usuarios]);
    }

    public function enviar()
    {
        Mail::to('prueba@mail.com')->send(new Password);
            return "mensaje enviado";
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
