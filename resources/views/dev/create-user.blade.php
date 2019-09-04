<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Crear nuevo usuario</title>
        <!-- Fuentes -->
        <link
            href="https://fonts.googleapis.com/css?family=Nunito:200,600"
            rel="stylesheet"
        />
        <!-- Estilos -->
        <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
        />
        <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"
        ></script>
    </head>
    <body>
      <div class="content">
        <div style="padding: 60px 160px 0px 160px" class="container d-flex flex-column ">
              <p class="text-center">Nueva marca</p>
              @if(count($errors) > 0)
                <div class="alert alert-danger">
                  <ul>
                  @foreach($errors->all() as $error)
                    <li>{{$error}}</li>
                  @endforeach
                  </ul>
                </div>
              @endif
              <form action="/dev/usuario/nuevo" method="POST" class="form-inline align-items-center justify-content-center" enctype="multipart/form-data" autocomplete="off">
                  {{ csrf_field() }}
                <div class="form-group mx-sm-3 mb-2">
                  <input class="form-control" id="nombre" name="nombre" placeholder="Nombre"/>
                  <input class="form-control" type="email" id="email" name="email" placeholder="Email"/>
                  <input class="form-control" type="password" id="password" name="password" placeholder="Contraseña"/>
                 </div>
                <button type="submit" class="btn btn-success mb-2">Aceptar</button>
              </form>
          </div>
      </div>
      <div style="padding: 40px 160px 0px 160px" class="container">
          <p class="text-center">Lista de marcas</p>
          @if(count($usuarios) > 0)
          <ul class="list-group">
            @foreach($usuarios as $usuario)
            <li
              class="list-group-item d-flex justify-content-between align-items-center action"
            >
              {{$usuario->name}}
              <br/>
              {{$usuario->email}}
              <div class="d-flex">
                @if($usuario->completado == 0)
                <form action="usuario/modificar/{{$usuario->id}}/" method="POST" style="margin-right: 5px" enctype="multipart/form-data">
                {{ csrf_field() }}
                  <label for="">Nombre</label>
                  <input class="form-control" id="nombre" name="nombre" value="{{$usuario->name}}">
                  <label for="">Email</label>
                  <input class="form-control" id="email" name="email" value="{{$usuario->email}}">
                  <button class="btn btn-info" type="submit" style="float:right">Actualizar</button>
                </form>
                <form action="usuario/modificarclave/{{$usuario->id}}/" method="POST" style="margin-right: 5px" enctype="multipart/form-data">
                {{ csrf_field() }}
                  <label for="">Password</label>
                  <input class="form-control" id="password" name="password" type="password" reload="off">
                  <button class="btn btn-info" type="submit" style="float:right">Cambiar contraseña</button>
                </form>
                @endif
                <form action="usuario/borrar/{{$usuario->id}}" method="POST">
                  {{ csrf_field() }}
                  {{ method_field('DELETE') }}
                  <button class="btn btn-danger" type="submit">Borrar</button>
                </form>
              </div>
            </li>
          @endforeach
        </ul>
        @endif
      </div>
    </body>
    <script type="text/javascript" src="js/app.js">

    </script>
</html>
