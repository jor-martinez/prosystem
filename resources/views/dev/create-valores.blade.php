<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div style="padding: 60px 160px 0px 160px" class="container d-flex flex-column ">
          <h1>Crear valor</h1>
          @if(count($errors) > 0)
            <div class="alert alert-danger">
              <ul>
              @foreach($errors->all() as $error)
                <li>{{$error}}</li>
              @endforeach
              </ul>
            </div>
          @endif
          <form action="/api/valores/nueva" method="POST" class="form-inline align-items-center justify-content-center">
          {{ csrf_field() }}
            <div class="form-group mx-sm-3 mb-2">
              <input class="form-control" id="valores" name="valores" placeholder="Valor">
              <input class="form-control" id="descripcion" name="descripcion" placeholder="Descripcion">
            </div>
            <button type="submit" class="btn btn-success mb-2">Aceptar</button>
          </form>
      </div>
      <div style="padding: 40px 160px 0px 160px" class="container">
          <p class="text-center">Lista de Valores</p>
          @if(count($valores) > 0)
          <ul class="list-group">
            @foreach($valores as $valor)
            <li

              @if($valor->completado == 1)
                style="background-color: #d7ff7c"
              @endif
              class="list-group-item d-flex justify-content-between align-items-center action"
            >
              {{$valor->valores}}
            </br>
              {{$valor->descripcion}}

              <div class="d-flex">
                @if($valor->completado == 0)
                <form action="valores/editar/{{$valor->id}}/" method="POST" style="margin-right: 5px">
                {{ csrf_field() }}
                  <label for="">Valor</label>
                  <input class="form-control" id="valores" name="valores" value="{{$valor->valores}}">
                  <label for="">Descripcion</label>
                  <input class="form-control" id="descripcion" name="descripcion" value="{{$valor->descripcion}}">
                  <button class="btn btn-info" type="submit" style="float:right">Actualizar</button>
                </form>
                @endif
                <form action="valores/borrar/{{$valor->id}}/" method="POST">
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
