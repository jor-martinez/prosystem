<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Caracteristicas;
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
        // $datos = Blog::where('slug', $slug)
        //         -> first();
        $datos = Blog::all();
        foreach($datos as $dato){
            if (($dato->slug) == $slug){
                return [$datos];
            }
        }   
        //return [$datos];
    }

    public function caracteristicas() {
        $datos = Caracteristicas::all();

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

    public function showProductos(){
        // $datos = Productos::where('slug', $slug);
        // return $datos;
        // $datos = Producto::all();
        // foreach($datos as $dato){
        //     if (($dato->slug) == $slug){
        //         return [$dato];
        //     }
        // }   
        return response('puto slug', 200)->header('Content-type', 'application/json');
    }


    public function servicios() {
        $datos = Servicios::all();

        return $datos;
    }

    public function showServicios($slug)
    {
        // $datos = Servicios::all();
        // foreach($datos as $dato){
        //     if (($dato->slug) == $slug){
        //         return [$dato];
        //     }
        // }    

        $datos = Servicios::where('slug', $slug);
        
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
