<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div style="padding: 60px 160px 0px 160px" class="container d-flex flex-column ">
          <h1>Crear Producto</h1>
          @if(count($errors) > 0)
            <div class="alert alert-danger">
              <ul>
              @foreach($errors->all() as $error)
                <li>{{$error}}</li>
              @endforeach
              </ul>
            </div>
          @endif
          <form action="/dev/productos/nueva/" method="POST" class="form-inline align-items-center justify-content-center" autocomplete="off" enctype="multipart/form-data">
          {{ csrf_field() }}
            <div class="form-group mx-sm-3 mb-2">
              <input class="form-control" id="titulo" name="titulo" placeholder="Titulo">
              <input class="form-control" id="descripcion" name="descripcion" placeholder="Descripcion">
              <input class="form-control" id="link" name="link" placeholder="Link">
              <input accept="image/" class="form-control" type="file" id="imagen" name="imagen" placeholder="Imagen"/>
            </div>
            <button type="submit" class="btn btn-success mb-2">Aceptar</button>
          </form>
      </div>
      <div style="padding: 40px 160px 0px 160px" class="container">
          <p class="text-center">Lista de productos</p>
          @if(count($productos) > 0)
          <ul class="list-group">
            @foreach($productos as $producto)
            <li

              @if($producto->completado == 1)
                style="background-color: #d7ff7c"
              @endif
              class="list-group-item d-flex justify-content-between align-items-center action"
            >
              {{$producto->titulo}}
            </br>
              {{$producto->descripcion}}
              </br>
              {{$producto->link}}
              <div class="d-flex">
                @if($producto->completado == 0)
                <form action="productos/editar/{{$producto->id}}/" method="POST" style="margin-right: 5px" enctype="multipart/form-data">
                {{ csrf_field() }}
                  <input class="form-control" id="titulo" name="titulo" value="{{$producto->titulo}}">
                  <input class="form-control" id="descripcion" name="descripcion" value="{{$producto->descripcion}}">
                  <input class="form-control" id="link" name="link" value="{{$producto->link}}">
                  <input accept="image/" class="form-control" type="file" id="imagen" name="imagen" placeholder="Imagen"/>
                  <button class="btn btn-info" type="submit" style="float:right">Actualizar</button>
                </form>
                @endif
                <form action="productos/borrar/{{$producto->id}}" method="POST">
                  {{ csrf_field() }}
                  {{ method_field('DELETE') }}
                  <button class="btn btn-danger" type="submit" style="float:right">Borrar</button>
                </form>
              </div>
            </li>
          @endforeach
        </ul>
        @endif
      </div>
  </body>
</html>
