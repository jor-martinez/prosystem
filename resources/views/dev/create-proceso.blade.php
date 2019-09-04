<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lista de procesos</title>
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
      <div style="padding: 60px 160px 0px 160px" class="container d-flex flex-column ">
            <p class="text-center">Nuevo proceso</p>
            @if(count($errors) > 0)
              <div class="alert alert-danger">
                <ul>
                @foreach($errors->all() as $error)
                  <li>{{$error}}</li>
                @endforeach
                </ul>
              </div>
            @endif
            <form action="/dev/proceso/nueva" method="post" class="form-inline align-items-center justify-content-center">
            {{ csrf_field() }}
              <div class="form-group mx-sm-3 mb-2">
                <input class="form-control" type="text" id="proceso" name="proceso" placeholder="Proceso nuevo">
                <input class="form-control" type="text" id="descripcion" name="descripcion" placeholder="Descripcion">
              </div>
              <button type="submit" class="btn btn-success mb-2">Aceptar</button>
            </form>
        </div>
        <div style="padding: 40px 160px 0px 160px" class="container">
            <p class="text-center">Lista de procesos</p>
            @if(count($procesos) > 0)
            <ul class="list-group">
              @foreach($procesos as $proceso)
              <li

                @if($proceso->completado == 1)
                  style="background-color: #d7ff7c"
                @endif
                class="list-group-item d-flex justify-content-between align-items-center action"
              >
                {{$proceso->proceso}}
              </br>
                {{$proceso->descripcion}}
                <div class="d-flex">
                  @if($proceso->completado == 0)
                  <form action="proceso/editar/{{$proceso->id}}/" method="POST" style="margin-right: 5px">
                  {{ csrf_field() }}
                    <label for="proceso">Proceso</label>
                    <input class="form-control" type="text" id="proceso" name="proceso" value="{{$proceso->proceso}}">
                    <label for="descripcion">Descripcion</label>
                    <input class="form-control" type="text" id="descripcion" name="descripcion" value="{{$proceso->descripcion}}">
                    <button class="btn btn-info" type="submit" style="float:right">Actualizar</button>
                  </form>
                  @endif
                  <form action="proceso/borrar/{{$proceso->id}}" method="POST">
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
