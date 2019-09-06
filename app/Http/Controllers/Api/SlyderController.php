<?php

namespace App\Http\Controllers\Api;
use App\Models\Slyder;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class SlyderController extends Controller
{
    
    public function index()
    {
        $deslizas = Slyder::all();
        return $deslizas;
    }

    public function store(Request $request)
    {
         $datos = [
             'Imagen' => 'required|image|mimes:jpg,jpeg,png'
         ];

        $this -> validate($request, $datos);

        $file = $request -> file('imagen');
        $nombre = $file -> getClientOriginalName();

        $dato = new Slyder;
        $dato -> titulo = $request -> titulo;
        $dato -> descripcion = $request -> descripcion;
        $dato -> imagen = $nombre;
        $dato -> link = $request -> link;
        $dato -> save();

        $upload = Storage::disk('uploads') -> put('images/slyder/' . $nombre, file_get_contents($file));

        return $upload
               ? response($nombre, 200) -> header('Content-type', 'application/json')
               : response('Error', 500) -> header('Content-type', 'application/json');

    }

    public function update(Request $request, $id)
    {
        $dato = Slyder::findOrFail($id);
            if($_FILES['imagen']['name']==''){
                $nombre = $dato -> imagen;
                $dato -> imagen = $nombre;
            } else{
                $ruta_acceso_imagen = public_path('images/slyder').'/'.$dato -> imagen;
                unlink($ruta_acceso_imagen);

                $file = $request -> file('imagen');//Tomando nueva imagen
                $nombre = $file -> getClientOriginalName();

                $upload = Storage::disk('uploads') -> put('images/slyder/' . $nombre, file_get_contents($file)); //Insertamos nueva imagen
                $dato -> imagen = $nombre;
            }

            $dato -> titulo = $request -> titulo;
            $dato -> descripcion = $request -> descripcion;
            $dato -> link = $request -> link;
            $dato -> save();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
 
    }

    public function destroy($id)
    {
        $dato = Slyder::findOrFail($id);
        $ruta_acceso_imagen = public_path('images/slyder').'/'.$dato -> imagen;
        unlink($ruta_acceso_imagen);
        $dato -> delete();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}
