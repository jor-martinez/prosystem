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
              'mision' => 'required|string|min:20|max:100',
              'vision' => 'required|string|min:20|max:100',
              'objetivo' => 'required|string|min:20|max:100'
          ];
          $this -> validate($request, $datos);
          $dato = new Nosotros;
          $dato -> mision = $request -> mision;
          $dato -> vision = $request -> vision;
          $dato -> objetivo = $request -> objetivo;
          $dato -> save();
           return redirect('/api/nosotros');
      }
      public function update(Request $request, $id)
      {
          $datos = [
              'historia' => 'required|string|min:20|max:100',
              'mision' => 'required|string|min:20|max:100',
              'vision' => 'required|string|min:20|max:100',
              'objetivo' => 'required|string|min:20|max:100'
          ];
          $this -> validate($request, $datos);
          $dato = Nosotros::findOrFail($id);
          $dato -> historia = $request -> historia;
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