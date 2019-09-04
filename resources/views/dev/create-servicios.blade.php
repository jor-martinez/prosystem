<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div style="padding: 60px 160px 0px 160px" class="container d-flex flex-column " >
          <h1>Crear servicio</h1>
          @if(count($errors) > 0)
            <div class="alert alert-danger">
              <ul>
              @foreach($errors->all() as $error)
                <li>{{$error}}</li>
              @endforeach
              </ul>
            </div>
          @endif
          <form action="/dev/servicios/nueva" method="POST" class="form-inline align-items-center justify-content-center" enctype="multipart/form-data">
          {{ csrf_field() }}
            <div class="form-group mx-sm-3 mb-2">
              <input class="form-control" id="nombre" name="nombre" placeholder="Nombre">
              <input class="form-control" id="descripcion" name="descripcion" placeholder="Descripcion">
              <input accept="image/" class="form-control" type="file" id="Imagen" name="Imagen" placeholder="Imagen"/>
            </div>
            <button type="submit" class="btn btn-success mb-2">Aceptar</button>
          </form>
      </div>
      <div style="padding: 40px 160px 0px 160px" class="container">
          <p class="text-center">Lista de Servicios</p>
          @if(count($servicios) > 0)
          <ul class="list-group">
            @foreach($servicios as $servicio)
            <li

              @if($servicio->completado == 1)
                style="background-color: #d7ff7c"
              @endif
              class="list-group-item d-flex justify-content-between align-items-center action"
            >
              {{$servicio->nombre}}
                </br>
              {{$servicio->slug}}
                </br>
              {{$servicio->descripcion}}
                </br>
              {{$servicio->Imagen}}
              <div class="d-flex">
                @if($servicio->completado == 0)
                <form action="servicios/editar/{{$servicio->id}}/" method="POST" style="margin-right: 5px" enctype="multipart/form-data">
                {{ csrf_field() }}
                  <label for="">Nombre</label>
                  <input class="form-control" id="nombre" name="nombre" value="{{$servicio->nombre}}">
                  <label for="">Descripcion</label>
                  <input class="form-control" id="descripcion" name="descripcion" value="{{$servicio->descripcion}}">
                  <label for="">Imagen</label>
                  <input accept="image/" type= "file" class="form-control" type="text" id="Imagen" name="Imagen" value={{$servicio->Imagen}}>
                  <button class="btn btn-info" type="submit" style="float:right">Actualizar</button>
                </form>
                @endif
                <form action="servicios/borrar/{{$servicio->id}}" method="POST">
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
