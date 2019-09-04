<?php
namespace App\Http\Controllers\Api;
use App\Models\Productos;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Utilidades\StringReplace;
use Illuminate\Support\Facades\Storage;
class ProductosController extends Controller
{
   
    public function index()
    {
        $productos = Productos::all();
        return view('dev.create-productos', ['productos' => $productos]);
    }
    public function store(Request $request)
    {
        
        $datos = [
            'titulo' => 'required|string|min:5|max:100',
            'descripcion' => 'required|string|min:10',
            'link' => 'required|string|min:11'
        ];
        $this -> validate($request, $datos);
        $dato = new Productos;
        $dato -> titulo = $request -> titulo;
        $dato -> descripcion = $request -> descripcion;
        $dato -> link = $request -> link;
        $dato -> save();
         return response("agregado", 200) -> header('Content-Type', 'application/json');
    }
    
    public function update(Request $request, $id)
    {
        $datos = [
            'titulo' => 'required|string|min:5|max:100',
            'descripcion' => 'required|string|min:10',
            'link' => 'required|string|min:11'
        ];
        $this -> validate($request, $datos);
        $dato = Productos::findOrFail($id);
        $dato -> titulo = $request -> titulo;
        $dato -> descripcion = $request -> descripcion;
        $dato -> link = $request -> link;
        $dato -> save();
        return response("actualizado", 200) -> header('Content-Type', 'application/json');
    }
    public function destroy($id)
    {
        $dato = Productos::findOrFail($id);
        $dato -> delete();
        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}