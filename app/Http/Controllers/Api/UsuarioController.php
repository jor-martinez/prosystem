<?php

namespace App\Http\Controllers\Api;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use App\Http\Controllers\Controller;
use App\Utilidades\StringReplace;
use Illuminate\Support\Facades\Storage;
use Auth;

class UsuarioController extends Controller
{

    public function index()
    {
        $usuarios = Usuario::where('email', '<>', 'admin@prosystem.mx') -> get() ;
        return $usuarios;
    }

    public function store(Request $request)
    {
        $datos = [
            'nombre' => 'required|string|min:5',
            'email' => 'required|email',
            'password' => 'required|string'
         ];

      $this -> validate($request, $datos);

        $dato = new Usuario;
        $dato -> name = $request -> nombre;
        $dato -> email = $request -> email;
        $dato -> password = bcrypt($request -> password);
        $dato -> save();

        return response("creado", 200) -> header('Content-Type', 'application/json');
    }


    public function update(Request $request, $id)
    {
         $datos = [
             'nombre' => 'required|string|min:5',
             'email' => 'required|string'
         ];

      $this -> validate($request, $datos);

        $dato = Usuario::findOrFail($id);
        $dato -> name = $request -> nombre;
        $dato -> email = $request -> email;
        $dato -> save();

        return response("actualizado", 200) -> header('Content-Type', 'application/json');
    }

    public function destroy($id)
    {
        $dato = Usuario::where('id',$id) -> delete();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }

    public function clave(Request $request, $id)
    {
        $dato = Usuario::findOrFail($id);
        $dato -> password = bcrypt($request -> password);
        $dato -> save();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
    
    public function show()
    {
        return Usuario::findOrFail(Auth::id());
    }

    public function passwordUpdate(Request $request, $id)
    {

        $dato = Usuario::findOrFail($id);
        $reglas = [
            'password'      => 'required|string|min:6',
            'passwordNew'   => 'required|string|min:6'
        ];
    
        $mensajes = [
            'password.required'      => 'password requerida',
            'passwordNew.required'   => 'password requerida',
            'passwordNew.min'        => 'password debe tener al menos 6 caracteres'
        ];
    
        $this -> validate($request, $reglas, $mensajes);
    
        if (\Hash::check($request['password'], $dato -> password)) {
           $dato -> password = bcrypt($request -> passwordNew);
           $dato -> save();
        } else {
           return response(['message' => 'Las contraseña actual no coincide'], 500) -> header('content-type', 'application/json');
        }  

    return response('Contraseña actualizada', 200) -> header('content-type', 'application/json');
    }
}

