<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Caracteristicas;
use App\Models\CatServicios;
use App\Models\Empresa;
use App\Models\Historia;
use App\Models\Marca;
use App\Models\Nosotros;
use App\Models\Proceso;
use App\Models\Productos;
use App\Models\Servicios;
use App\Models\Valores;
use App\Models\Usuario;
use App\Models\Slyder;


class MainController extends Controller
{

    public function blog() {
        $datos = Blog::all(); 
        return $datos;
    }

    public function showBlog($slug) {
      
        $datos = Blog::where('slug', $slug) -> get();
        
        return $datos;

        
    }

    public function caracteristicas() {
        $datos = Caracteristicas::all();

        return $datos;
    }

    public function categorias() {
        $datos = CatServicios::all();

        return $datos;
    }


    public function empresa() {
        $datos = Empresa::all();

        return $datos;
    }

    public function marcas() {
        $datos = Marca::all();

        return $datos;
    }

    public function historia() {
        $datos = Historia::all();

        return $datos;
    }

    public function nosotros() {
        $datos = Nosotros::all();

        return $datos;
    }

    public function proceso() {
        $datos = Proceso::all();

        return $datos;
    }

    public function productos() {
        $datos = Productos::all();

        return $datos;
    }

    public function showProductos($slug){

        $datos = Productos::where('slug', $slug) -> get(); 
        return $datos;

    }


    public function servicios() {
        $datos = Servicios::all();

        return $datos;
    }

    public function showServicios($slug)
    {
        $datos = Servicios::where('slug', $slug) -> get();
        
        return $datos;
    } 

    public function valores() {
        $datos = Valores::all();

        return $datos;
    }

    public function usuarios() {
        $datos = Usuario::all();

        return $datos;
    }

    public function slyder() {
        $datos = Slyder::all();

        return $datos;
    }
}
