<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div style="padding: 60px 160px 0px 160px" class="container d-flex flex-column ">
          <h1>Crear Empresa</h1>
          @if(count($errors) > 0)
            <div class="alert alert-danger">
              <ul>
              @foreach($errors->all() as $error)
                <li>{{$error}}</li>
              @endforeach
              </ul>
            </div>
          @endif
          <form action="/api/empresa/nueva/" method="POST" class="form-inline align-items-center justify-content-center">
          {{ csrf_field() }}
            <div class="form-group mx-sm-3 mb-2">
              <input type="text" class="form-control" id="ubicacion" name="ubicacion" placeholder="Ubicacion">
              <input type="text" class="form-control" id="telefono" name="telefono" placeholder="Telefono">
              <input type="text" class="form-control" id="correo" name="correo" placeholder="Correo">
            </div>
            <button type="submit" class="btn btn-success mb-2">Aceptar</button>
          </form>
      </div>
      <div style="padding: 40px 160px 0px 160px" class="container">
          <p class="text-center">Lista de empresas</p>
          @if(count($empresas) > 0)
          <ul class="list-group">
            @foreach($empresas as $empresa)
            <li

              @if($empresa->completado == 1)
                style="background-color: #d7ff7c"
              @endif
              class="list-group-item d-flex justify-content-between align-items-center action"
            >
              {{$empresa->ubicacion}}
            </br>
              {{$empresa->telefono}}
              </br>
              {{$empresa->correo}}
              <div class="d-flex">
                @if($empresa->completado == 0)
                <form action="empresa/editar/{{$empresa->id}}/" method="POST" style="margin-right: 5px">
                {{ csrf_field() }}
                  <input class="form-control" id="ubicacion" name="ubicacion" value="{{$empresa->ubicacion}}">
                  <input class="form-control" id="telefono" name="telefono" value="{{$empresa->telefono}}">
                  <input class="form-control" id="correo" name="correo" value="{{$empresa->correo}}">
                  <button class="btn btn-info" type="submit" style="float:right">Actualizar</button>
                </form>
                @endif
                <form action="empresa/borrar/{{$empresa->id}}" method="POST">
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
