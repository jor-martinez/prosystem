<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Blog</title>
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
            <p class="text-center">Blog</p>
            @if(count($errors) > 0)
              <div class="alert alert-danger">
                <ul>
                @foreach($errors->all() as $error)
                  <li>{{$error}}</li>
                @endforeach
                </ul>
              </div>
            @endif
            <form action="/dev/blog/nueva/" method="POST" class="form-inline align-items-center justify-content-center" enctype="multipart/form-data">
            {{ csrf_field() }}
              <div class="form-group mx-sm-3 mb-2">
                <input class="form-control" type="text" id="titulo" name="titulo" placeholder="Titulo">
                <input class="form-control" type="text" id="autor" name="autor" placeholder="Autor">
                <input class="form-control" type="text" id="cuerpo" name="cuerpo" placeholder="Cuerpo">
                <input accept="image/" type= "file" class="form-control" type="text" id="encabezado" name="encabezado" placeholder="Encabezado">
              </div>
              <button type="submit" class="btn btn-success mb-2">Aceptar</button>
            </form>
        </div>
        <div style="padding: 40px 160px 0px 160px" class="container">
            <p class="text-center">Blog</p>
            @if(count($blogs) > 0)
            <ul class="list-group">
              @foreach($blogs as $blog)
              <li

                @if($blog->completado == 1)
                  style="background-color: #d7ff7c"
                @endif
                class="list-group-item d-flex justify-content-between align-items-center action"
              >
                {{$blog->titulo}}
              </br>
                {{$blog->slug}}
              </br>
                {{$blog->autor}}
              </br>
                {{$blog->cuerpo}}
              </br>
                {{$blog->encabezado}}
                <div class="d-flex">
                  @if($blog->completado == 0)
                  <form action="blog/editar/{{$blog->id}}/" method="POST" style="margin-right: 5px" enctype="multipart/form-data">
                    {{ csrf_field() }}
                    <label for="">Titulo</label>
                    <input class="form-control" type="text" id="titulo" name="titulo" value={{$blog->titulo}}>
                    <label for="">Autor</label>
                    <input class="form-control" type="text" id="autor" name="autor" value={{$blog->autor}}>
                    <label for="">Cuerpo</label>
                    <input class="form-control" type="text" id="cuerpo" name="cuerpo" value={{$blog->cuerpo}}>
                    <label for="">Encabezado</label>
                  </br>
                    <label for="">Archivo cargado</label>
                  </br>
                    <p>{{$blog->encabezado}}</p>
                    <input accept="image/" type= "file" class="form-control" id="encabezado" name="encabezado">
                    <button class="btn btn-info" type="submit" style="float:right">Actualizar</button>
                  </form>
                  @endif
                  <form action="blog/borrar/{{$blog->id}}" method="POST">
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
