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
        return view('dev.create-productos')->with ('productos', $productos);
    }

    public function store(Request $request)
    {
        
        $datos = [
            'titulo' => 'required|string|min:5',
            'descripcion' => 'required|string|min:10',
            'imagen' => 'required|image|mimes:jpg,jpeg,png'
        ];
        $this -> validate($request, $datos);

        $file = $request -> file('imagen');
        $nombre_imagen = uniqid();

        $dato = new Productos;
        $dato -> titulo = $request -> titulo;
        $dato -> descripcion = $request -> descripcion;
        $dato -> link = $request -> link;
        $dato -> imagen = $nombre_imagen;
        $dato -> save();

        $upload = Storage::disk('uploads') -> put('images/productos/' . $nombre_imagen, file_get_contents($file));

        // return $upload
        //        ? response(200) -> header('Content-type', 'application/json')
        //        : response('Error', 500) -> header('Content-type', 'application/json');
        return response("actualizado", 200) -> header('Content-Type', 'application/json');
    }
    
    public function update(Request $request, $id)
    {
        $datos = [
            'titulo' => 'required|string|min:5',
            'descripcion' => 'required|string|min:10'
        ];
        $this -> validate($request, $datos);

        $dato = Productos::findOrFail($id);

        if(is_null($request -> file('Imagen'))){
            $dato -> titulo = $request -> titulo;
            $dato -> descripcion = $request -> descripcion;
            $dato -> link = $request -> link;
            $dato -> save();
    
            return response("actualizado", 200) -> header('Content-Type', 'application/json');
        } else {
            $ruta_acceso_imagen = public_path('images\productos').'/'.$dato -> imagen;
            unlink($ruta_acceso_imagen);

            $file = $request -> file('imagen');
            $nombre_imagen = uniqid();

            $upload = Storage::disk('uploads') -> put('images/productos/' . $nombre_imagen, file_get_contents($file));
            $dato -> imagen = $nombre_imagen;

            $dato -> titulo = $request -> titulo;
            $dato -> descripcion = $request -> descripcion;
            $dato -> link = $request -> link;
            $dato -> save();
    
            return response("actualizado", 200) -> header('Content-Type', 'application/json');
        }

    
    }
    public function destroy($id)
    {
        $dato = Productos::findOrFail($id);
        $ruta_acceso_imagen = public_path('images\productos').'/'.$dato -> imagen;
        unlink($ruta_acceso_imagen);
        $dato -> delete();
        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}