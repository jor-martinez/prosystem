<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Slyder</title>
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
              <p class="text-center">Nueva diapositiva</p>
              @if(count($errors) > 0)
                <div class="alert alert-danger">
                  <ul>
                  @foreach($errors->all() as $error)
                    <li>{{$error}}</li>
                  @endforeach
                  </ul>
                </div>
              @endif
              <form action="/dev/slyder/nuevo" method="POST" class="form-inline align-items-center justify-content-center" enctype="multipart/form-data">
                  {{ csrf_field() }}
                <div class="form-group mx-sm-3 mb-2">
                  <input class="form-control" id="titulo" name="titulo" placeholder="Titulo"/>
                  <input class="form-control" id="descripcion" name="descripcion" placeholder="Descripcion"/>
                  <input type="checkbox" class="form-control" id="link" name="link" placeholder="Link"/>
                  <input accept="image/" class="form-control" type="file" id="imagen" name="imagen" placeholder="Imagen"/>
                 </div>
                <button type="submit" class="btn btn-success mb-2">Aceptar</button>
              </form>
          </div>
      </div>
      <div style="padding: 40px 160px 0px 160px" class="container">
          <p class="text-center">Lista de deslizas</p>
          @if(count($deslizas) > 0)
          <ul class="list-group">
            @foreach($deslizas as $desliza)
            <li
              class="list-group-item d-flex justify-content-between align-items-center action"
            >
              {{$desliza->titulo}}
              <br/>
              {{$desliza->descripcion}}
              <br/>
              {{$desliza->link}}
              <br/>
              {{$desliza->imagen}}
              <div class="d-flex">
                @if($desliza->completado == 0)
                  <form action="slyder/modificar/{{$desliza->id}}/" method="POST" style="margin-right: 5px" enctype="multipart/form-data">
                  {{ csrf_field() }}
                    <label for="">Nombre</label>
                    <input class="form-control" id="titulo" name="titulo" value="{{$desliza->titulo}}">
                    <label for="">Descripcion</label>
                    <input type="text" class="form-control" id="descripcion" name="descripcion" value="{{$desliza->descripcion}}">
                    <label for="">link</label>
                    <input type="text" class="form-control" id="link" name="link" value="{{$desliza->link}}">
                    <label for="">Imagen</label>
                    <span value="{{$desliza->link}}"></span>
                    <input accept="image/" type= "file" class="form-control" type="text" id="imagen" name="imagen" value={{$desliza->Imagen}}>
                    <button class="btn btn-info" type="submit" style="float:right">Actualizar</button>
                  </form>
                @endif
                <form action="slyder/borrar/{{$desliza->id}}" method="POST">
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
