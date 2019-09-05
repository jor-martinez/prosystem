<?php

namespace App\Http\Controllers\Api;
use App\Models\Historia;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HistoriaController extends Controller
{
  
    public function index()
    {
        $historia = Historia::all();
        return $historia;
    }


    public function store(Request $request)
    {
        $datos = [
            'historia' => 'required|string|min:20'
        ];

        $this -> validate($request, $datos);

          $dato = new Historia;
          $dato -> historia = $request -> historia;
          $dato -> save();

          return redirect('/api/historia');
    }


    public function update(Request $request, $id)
    {
        $datos = [
            'historia' => 'required|string|min:20|max:100'
        ];

        $this -> validate($request, $datos);

        $dato = Historia::findOrFail($id);
        $dato -> historia = $request -> historia;
        $dato -> save();
          
          return response("actualizado", 200) -> header('Content-Type', 'application/json');
    }


    public function destroy($id)
    {
        $dato = Historia::where('id',$id) -> delete();

          return response("eliminado", 200) -> header('Content-Type', 'application/json');
    }
}
