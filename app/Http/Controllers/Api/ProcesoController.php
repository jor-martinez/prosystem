<?php

namespace App\Http\Controllers\Api;
use App\Models\Proceso;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProcesoController extends Controller
{

    public function index()
    {
          $procesos = Proceso::all();
          return $procesos;
    }

    public function store(Request $request)
    {

        $datos = [
            'proceso' => 'required|string|min:8',
            'descripcion' => 'required|string'
        ];

        $this -> validate($request, $datos);

        $dato = new Proceso;
        $dato -> proceso = $request -> proceso;
        $dato -> descripcion = $request -> descripcion;
        $dato -> save();

    }

    public function update(Request $request, $id)
    {

        $datos = [
            'proceso' => 'required|string|min:8',
            'descripcion' => 'required|string|min:20'
        ];
        $this -> validate($request, $datos);

        $dato = Proceso::findOrFail($id);
        $dato -> proceso = $request -> proceso;
        $dato -> descripcion = $request -> descripcion;
        $dato -> save();

        return response("actualizado", 200) -> header('Content-Type', 'application/json');
    }

    public function destroy($id)
    {
        $dato = Proceso::where('id',$id) -> delete();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}
