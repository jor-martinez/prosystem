<?php

namespace App\Http\Controllers\Api;
use App\Models\Nosotros;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
class NosotrosController extends Controller
{
      public function index()
      {
          $nosotros = Nosotros::all();
          return $nosotros;
      }
      public function store(Request $request)
      {
          $datos = [
              'mision' => 'required|string|min:20',
              'vision' => 'required|string|min:20',
              'objetivo' => 'required|string|min:20'
          ];
          $this -> validate($request, $datos);
          $dato = new Nosotros;
          $dato -> mision = $request -> mision;
          $dato -> vision = $request -> vision;
          $dato -> objetivo = $request -> objetivo;
          $dato -> save();
          return response("creado", 200) -> header('Content-Type', 'application/json');
      }
      public function update(Request $request, $id)
      {
          $datos = [
              'mision' => 'required|string|min:20',
              'vision' => 'required|string|min:20',
              'objetivo' => 'required|string|min:20'
          ];
          $this -> validate($request, $datos);
          $dato = Nosotros::findOrFail($id);
          $dato -> mision = $request -> mision;
          $dato -> vision = $request -> vision;
          $dato -> objetivo = $request -> objetivo;
          $dato -> save();
          
          return response("actualizado", 200) -> header('Content-Type', 'application/json');
      }
      public function destroy($id)
      {
          $dato = Nosotros::where('id',$id) -> delete();
          return response("eliminado", 200) -> header('Content-Type', 'application/json');
      }
}