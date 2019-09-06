<?php

namespace App\Http\Controllers\Api;
use App\Models\Blog;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Utilidades\StringReplace;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::all();
        return $blogs;
    }

    public function store(Request $request)   //Store
    {

        $datos = [
            'titulo' => 'required|string|min:5',
            'autor' => 'required|string|min:5',
            'cuerpo' => 'required|string|min:10',
            'encabezado' => 'required|image|mimes:jpg,jpeg,png'
        ];
        $this -> validate($request, $datos);

        $file = $request -> file('encabezado');
        $nombre = $file -> getClientOriginalName();

        $dato = new Blog;
        $dato -> titulo = $request -> titulo;
        $dato -> slug = StringReplace::getPureString($request -> titulo);
        $dato -> autor = $request -> autor;
        $dato -> cuerpo = $request -> cuerpo;
        $dato -> encabezado = $nombre;
        $dato -> save();

        $upload = Storage::disk('uploads') -> put('images/blog/' . $nombre, file_get_contents($file));
        return $upload
               ? response($nombre, 200) -> header('Content-type', 'application/json')
               : response('Error', 500) -> header('Content-type', 'application/json');
    }

    public function update(Request $request, $id)   //update
    {
        $datos = [
            'titulo' => 'required|string|min:5',
            'autor' => 'required|string|min:5',
            'cuerpo' => 'required|string|min:10'
        ];
        $this -> validate($request, $datos);

        $dato = Blog::findOrFail($id);

        if(is_null($request -> file('encabezado'))){
            
                $dato -> titulo = $request -> titulo;
                $dato -> slug = StringReplace::getPureString($request -> titulo);
                $dato -> autor = $request -> autor;
                $dato -> cuerpo = $request -> cuerpo;
                $dato -> save();

            return response("actualizado", 200) -> header('Content-Type', 'application/json');
               
            
        }  else{
                $ruta_acceso_imagen = public_path('images\blog').'/'.$dato -> encabezado;//Eliminar imagen actual
                unlink($ruta_acceso_imagen);

                $file = $request -> file('encabezado');//Tomando nueva imagen
                $nombre = $file -> getClientOriginalName();

                $upload = Storage::disk('uploads') -> put('images/blog/' . $nombre, file_get_contents($file)); //Insertamos nueva imagen
                $dato -> encabezado = $nombre;

                $dato -> titulo = $request -> titulo;
                $dato -> slug = StringReplace::getPureString($request -> titulo);
                $dato -> autor = $request -> autor;
                $dato -> cuerpo = $request -> cuerpo;
                $dato -> save();

            return response("actualizado", 200) -> header('Content-Type', 'application/json');
        }
    }

    public function destroy($titulo)
    {
        $dato = Blog::findOrFail($titulo);
        $ruta_acceso_imagen = public_path('images\blog').'/'.$dato -> encabezado;
        unlink($ruta_acceso_imagen);
        $dato -> delete();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}
