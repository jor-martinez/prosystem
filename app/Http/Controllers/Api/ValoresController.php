<?php

namespace App\Http\Controllers\Api;
use App\Models\Valores;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ValoresController extends Controller
{

    public function index()
    {
        $valores = Valores::all();
        return $valores;
    }

    public function store(Request $request)
    {

        $datos = [
            'valores' => 'required|string|min:5',
            'descripcion' => 'required|string|min:10'
        ];

        $this -> validate($request, $datos);

        $dato = new Valores;
        $dato -> valores = $request -> valores;
        $dato -> descripcion = $request -> descripcion;
        $dato -> save();

        return response("creado", 200) -> header('Content-Type', 'application/json');
    }

    public function update(Request $request, $id)
    {

        $datos = [
            'valores' => 'required|string|min:5',
            'descripcion' => 'required|string|min:10'
        ];

        $this -> validate($request, $datos);

        $dato = Valores::findOrFail($id);
        $dato -> valores = $request -> valores;
        $dato -> descripcion = $request -> descripcion;
        $dato -> save();

        return response("actualizado", 200) -> header('Content-Type', 'application/json');
    }

    public function destroy($id)
    {
        $dato = Valores::where('id',$id) -> delete();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}
