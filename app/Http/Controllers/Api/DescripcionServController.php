<?php

namespace App\Http\Controllers\Api;
use App\Models\CatServicios;
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
        return $cat;
    }

    public function store(Request $request)
    {
        $datos = [
            'titulo' => 'required|string|min:5',
            'descripcion' => 'required|string|min:5',
            //'imagen' => 'required|image|mimes:jpg,jpeg,png'
        ];
        $this -> validate($request, $datos);

        // $file = $request -> file('imagen');
        // $nombre_im = $file -> uniqid();

        $dato = new CatServicios;
    
        $dato -> id_serv = $request -> id;
        $dato -> titulo = $request -> titulo;
        $dato -> slug = StringReplace::getPureString($request -> titulo);
        $dato -> descripcion = $request -> descripcion;
        //$dato -> imagen = $nombre_imagen;
        $dato -> save();

        
        //$upload = Storage::disk('uploads') -> put('images/categorias/' . $nombre_imagen, file_get_contents($file));

        return response("creado", 200) -> header('Content-Type', 'application/json');
    }
    
    public function show($id)
    {
        $datos = CatServicios::where('slug', $slug) -> get(); 
        return $datos; 
    }


    public function update(Request $request, $id)
    {

        // $datos = [
        //     'titulo' => 'required|string|min:5',
        //     'descripcion' => 'required|string|min:10',
        //     'imagen' => 'required|image|mimes:jpg,jpeg,png'
        // ];
        // $this -> validate($request, $datos);

        // $dato = CatServicios::findOrFail($id);

        // if(is_null($request -> file('imagen'))){
        //     $dato -> titulo = $request -> titulo;
        //     $dato -> slug = StringReplace::getPureString($request -> titulo);
        //     $dato -> descripcion = $request -> descripcion;
        //     $dato -> link = $request -> link;
        //     $dato -> save();
    
        //     return response("actualizado", 200) -> header('Content-Type', 'application/json');
        // } else {
        //     $ruta_acceso_imagen = public_path('images/categorias').'/'.$dato -> imagen;
        //     unlink($ruta_acceso_imagen);

        //     $file = $request -> file('imagen');
        //     $nombre_imagen = uniqid();

        //     $upload = Storage::disk('uploads') -> put('images/categorias/' . $nombre_imagen, file_get_contents($file));
        //     $dato -> imagen = $nombre_imagen;

        //     $dato -> titulo = $request -> titulo;
        //     $dato -> descripcion = $request -> descripcion;
        //     $dato -> link = $request -> link;
        //     $dato -> save();
    
        //     return response("actualizado", 200) -> header('Content-Type', 'application/json');
        // }




        $datos = [
            'titulo' => 'required|string|min:2',
            'descripcion' => 'required|string|min:2',
        ];
        $this -> validate($request, $datos);

        $dato = CatServicios::findOrFail($id);
        $dato -> titulo = $request -> titulo;
        $dato -> slug = StringReplace::getPureString($request -> titulo);
        $dato -> descripcion = $request -> descripcion;
        $dato -> save();

        return response("actualizado", 200) -> header('Content-Type', 'application/json');
    }

    public function destroy($id)
    {
        $dato = CatServicios::findOrFail($titulo);
        //$ruta_acceso_imagen = public_path('images/categorias').'/'.$dato -> encabezado;
        //unlink($ruta_acceso_imagen);
        $dato -> delete();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}
