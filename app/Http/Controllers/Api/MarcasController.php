<?php
namespace App\Http\Controllers\Api;
use App\Models\Marca;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MarcasController extends Controller
{

    public function index()
    {
        $marcas = Marca::all();
        return $marcas;
    }

    public function store(Request $request)
    {
          $datos = [
              'Nombre' => 'required|string|min:2',
              'Imagen' => 'required|image|mimes:jpg,jpeg,png'
          ];
          $this -> validate($request, $datos);

          $file = $request -> file('Imagen');
          $nombre = $file -> getClientOriginalName();

          $dato = new Marca;
          $dato -> Nombre = $request -> Nombre;
          $dato -> Imagen = $nombre;
          $dato -> save();

          $upload = Storage::disk('uploads') -> put('images/marcas/' . $nombre, file_get_contents($file));
          return $upload
                 ? response($nombre, 200) -> header('Content-type', 'application/json')
                 : response('Error', 500) -> header('Content-type', 'application/json');

    }

    public function destroy($id)
    {
        $dato = Marca::findOrFail($id);
        $ruta_acceso_imagen = public_path('images/marcas').'/'.$dato -> Imagen;
        unlink($ruta_acceso_imagen);
        $dato -> delete();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }

}
