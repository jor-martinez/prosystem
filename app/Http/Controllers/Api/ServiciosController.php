<?php

namespace App\Http\Controllers\Api;
use App\Models\Servicios;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Utilidades\StringReplace;
use Illuminate\Support\Facades\Storage;

class ServiciosController extends Controller
{

    public function index()
    {
        $servicios = Servicios::all();
        return $servicios;
    }

    public function store(Request $request)
    {

        $datos = [
            'nombre' => 'required|string|min:8',
            'descripcion' => 'required|string|min:10'
        ];

        $this -> validate($request, $datos);

        $file = $request -> file('Imagen');
        $nombre = $file -> getClientOriginalName();

        $dato = new Servicios;
        $dato -> nombre = $request -> nombre;
        $dato -> slug = StringReplace::getPureString($request -> nombre);
        $dato -> descripcion = $request -> descripcion;
        $dato -> Imagen = $nombre;
        $dato -> save();

        $upload = Storage::disk('uploads') -> put('images/servicios/' . $nombre, file_get_contents($file));

        return $upload
               ? response($nombre, 200) -> header('Content-type', 'application/json')
               : response('Error', 500) -> header('Content-type', 'application/json');
    }

    public function update(Request $request, $id)
    {

        $datos = [
            'nombre' => 'required|string|min:5',
            'descripcion' => 'required|string|min:10'
        ];

        $this -> validate($request, $datos);

        $dato = Servicios::findOrFail($id);
        if($_FILES['Imagen']['name']==''){
            $nombre = $dato -> Imagen;
            $dato -> Imagen = $nombre;
        } else{
            $ruta_acceso_imagen = public_path('images\servicios').'/'.$dato -> Imagen;//Eliminar imagen actual
            unlink($ruta_acceso_imagen);

            $file = $request -> file('Imagen');//Tomando nueva imagen
            $nombre = $file -> getClientOriginalName();

            $upload = Storage::disk('uploads') -> put('images/servicios/' . $nombre, file_get_contents($file)); //Insertamos nueva imagen
            $dato -> Imagen = $nombre;
        }

        $dato -> nombre = $request -> nombre;
        $dato -> slug = StringReplace::getPureString($request -> nombre);
        $dato -> descripcion = $request -> descripcion;
        $dato -> save();

        return response("actualizado", 200) -> header('Content-Type', 'application/json');
    }

    public function destroy($slug)
    {
        $dato = Servicios::findOrFail($slug);
        $ruta_acceso_imagen = public_path('images\servicios').'/'.$dato -> Imagen;
        unlink($ruta_acceso_imagen);
        $dato -> delete();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}
