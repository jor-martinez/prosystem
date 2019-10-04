<?php

namespace App\Http\Controllers\Api;
use App\Models\CatServicios;
use App\Models\Servicios;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Utilidades\StringReplace;
use Illuminate\Support\Facades\Storage;

class DescripcionServController extends Controller
{

    public function index()
    {
        $cat = CatServicios::all();
        return view('dev.create-catServ', ['cat' => $cat]);
    }

    public function store(Request $request)
    {
        $datos = [
            'titulo' => 'required|string|min:5',
            'descripcion' => 'required|string|min:5',
        ];
        $this -> validate($request, $datos);

        $dato = new CatServicios;
    
        $dato -> id_serv = $request -> id;
        $dato -> titulo = $request -> titulo;
        $dato -> descripcion = $request -> descripcion;
        $dato -> save();

        return response("creado", 200) -> header('Content-Type', 'application/json');
    }
    
    public function show($id)
    {
        $datos = CatServicios::all();
        foreach($datos as $dato){
            if (($dato->id) == $id){
                return [$dato];
            }
        }   
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
