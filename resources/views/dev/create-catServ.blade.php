<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Caracteristicas</title>
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
              <p class="text-center">Nueva caracteristica</p>
              @if(count($errors) > 0)
                <div class="alert alert-danger">
                  <ul>
                  @foreach($errors->all() as $error)
                    <li>{{$error}}</li>
                  @endforeach
                  </ul>
                </div>
              @endif
              <form action="/dev/categoria/nueva" method="POST" class="form-inline align-items-center justify-content-center" enctype="multipart/form-data">
                  {{ csrf_field() }}
                <div class="form-group mx-sm-3 mb-2">
                  <input class="form-control" id="titulo" name="titulo" placeholder="Titulo"/>
                  <input accept="image/" class="form-control" type="text" id="descripcion" name="descripcion" placeholder="Descripción"/>
                 </div>
                <button type="submit" class="btn btn-success mb-2">Aceptar</button>
              </form>
          </div>
      </div>
      <div style="padding: 40px 160px 0px 160px" class="container">
          <p class="text-center">Categorias</p>
          @if(count($cat) > 0)
          <ul class="list-group">
            @foreach($cat as $c)
            <li
              class="list-group-item d-flex justify-content-between align-items-center action"
            >
              {{$c->titulo}}
              <br/>
              {{$c->descripcion}}
              <div class="d-flex">
                @if($c->completado == 0)
                <form action="categoria/editar/{{$c->id}}" method="POST" class="form-inline align-items-center justify-content-center" enctype="multipart/form-data">
                  {{ csrf_field() }}
                <div class="form-group mx-sm-3 mb-2">
                  <input class="form-control" id="titulo" name="titulo" value="{{$c->titulo}}"/>
                  <input class="form-control" id="descripcion" name="descripcion" value="{{$c->descripcion}}"/>
                 </div>
                <button type="submit" class="btn btn-success mb-2">Aceptar</button>
              </form>
                @endif
                <form action="categoria/borrar/{{$c->id}}" method="POST">
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
