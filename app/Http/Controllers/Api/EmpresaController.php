<?php
namespace App\Http\Controllers\Api;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class EmpresaController extends Controller
{

    public function index()
    {
        $empresas = Empresa::all();
        return $empresas;
    }

    public function store(Request $request)
    {

        $datos = [
            'ubicacion' => 'required|string|min:15|max:100',
            'telefono' => 'required|string|min:10|max:100',
            'correo' => 'required|string|min:11|max:30'
        ];

        $this -> validate($request, $datos);

        $dato = new Empresa;
        $dato -> ubicacion = $request -> ubicacion;
        $dato -> telefono = $request -> telefono;
        $dato -> correo = $request -> correo;
        $dato -> save();

         return redirect('/api/empresa/');
    }

    public function update(Request $request, $id)
    {

        $datos = [
            'ubicacion' => 'required|string|min:15|max:100',
            'telefono' => 'required|int|min:10|max:100',
            'correo' => 'required|string|min:11|max:30'
        ];

        $this -> validate($request, $datos);

        $dato = Empresa::findOrFail($id);
        $dato -> ubicacion = $request -> ubicacion;
        $dato -> telefono = $request -> telefono;
        $dato -> correo = $request -> correo;
        $dato -> update();

        return response("actualizado", 200) -> header('Content-Type', 'application/json');
    }

    public function destroy($id)
    {
        $dato = Empresa::findOrFail($id);
        $dato -> delete();

        return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}
