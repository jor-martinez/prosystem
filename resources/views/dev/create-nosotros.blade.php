<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nosotros</title>
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
            <p class="text-center">Nosotros</p>
            @if(count($errors) > 0)
              <div class="alert alert-danger">
                <ul>
                @foreach($errors->all() as $error)
                  <li>{{$error}}</li>
                @endforeach
                </ul>
              </div>
            @endif
            <form action="/dev/nosotros/nueva" method="POST" class="form-inline align-items-center justify-content-center">
            {{ csrf_field() }}
              <div class="form-group mx-sm-3 mb-2">
                <input class="form-control" type="text" id="historia" name="historia" placeholder="Historia">
                <input class="form-control" type="text" id="mision" name="mision" placeholder="Misión">
                <input class="form-control" type="text" id="vision" name="vision" placeholder="Visión">
                <input class="form-control" type="text" id="objetivo" name="objetivo" placeholder="Objetivo">
              </div>
              <button type="submit" class="btn btn-success mb-2">Aceptar</button>
            </form>
        </div>
        <div style="padding: 40px 160px 0px 160px" class="container">
            <p class="text-center">Nosotros</p>
            @if(count($nosotros) > 0)
            <ul class="list-group">
              @foreach($nosotros as $nuestro)
              <li

                @if($nuestro->completado == 1)
                  style="background-color: #d7ff7c"
                @endif
                class="list-group-item d-flex justify-content-between align-items-center action"
              >
                {{$nuestro->historia}}
              </br>
                {{$nuestro->mision}}
              </br>
                {{$nuestro->vision}}
              </br>
                {{$nuestro->objetivo}}
                <div class="d-flex">
                  @if($nuestro->completado == 0)
                  <form action="nosotros/editar/{{$nuestro->id}}" method="POST" style="margin-right: 5px">
                    {{ csrf_field() }}
                    <label for="">Historia</label>
                    <input class="form-control" type="text" id="historia" name="historia" value={{$nuestro->historia}}>
                    <label for="">Misión</label>
                    <input class="form-control" type="text" id="mision" name="mision" value={{$nuestro->mision}}>
                    <label for="">Visión</label>
                    <input class="form-control" type="text" id="vision" name="vision" value={{$nuestro->vision}}>
                    <label for="">Objetivo</label>
                    <input class="form-control" type="text" id="objetivo" name="objetivo" value={{$nuestro->objetivo}}>
                    <button class="btn btn-info" type="submit" style="float:right">Actualizar</button>
                  </form>
                  @endif
                  <form action="nosotros/borrar/{{$nuestro->id}}" method="POST">
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
