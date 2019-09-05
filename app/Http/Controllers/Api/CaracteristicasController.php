<?php

namespace App\Http\Controllers\Api;
use App\Models\Caracteristicas;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Utilidades\StringReplace;
use Illuminate\Support\Facades\Storage;

class CaracteristicasController extends Controller
{
   
    public function index()
    {
        $caracteristicas = Caracteristicas::all();
        return $caracteristicas;
    }

    public function store(Request $request)
    {
        $datos = [
            'titulo' => 'required|string|min:2',
            'descripcion' => 'required|string|min:2',
        ];
        $this -> validate($request, $datos);

        $dato = new Caracteristicas;
        $dato -> titulo = $request -> titulo;
        $dato -> descripcion = $request -> descripcion;
        $dato -> save();

        return redirect('/api/caracteristicas/');
    }

    public function update(Request $request, $id)
    {
        $datos = [
            'titulo' => 'required|string|min:2',
            'descripcion' => 'required|string|min:2',
        ];
        $this -> validate($request, $datos);

        $dato = Caracteristicas::findOrFail($id);
        $dato -> titulo = $request -> titulo;
        $dato -> descripcion = $request -> descripcion;
        $dato -> save();

        return response("actualizado", 200) -> header('Content-Type', 'application/json');
    }

    public function destroy($id)
    {
        $dato = Caracteristicas::findOrFail($id) -> delete();
        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}
