<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ URL::asset('/') }}css/login.css" />
    <title>Recuperación de contraseña</title>
</head>
<body>
    <div class="login-box">
        <div class="img-block">
            <img src="{{ asset('images/logo-pro.png') }}" alt="logo">
        </div>
        <h4 class="login-title">Recuperar contraseña</h4>
        <form method="post" action="/contraseña/correo">
            {{ csrf_field() }}
            <div class="form-group">
                <i class="fas fa-envelope"></i>
                <!-- <label for="email">Contraseña: </label> -->
                <input id="email" type="email" class="form-control {{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required placeholder="Correo">
                    @if ($errors->has('email'))
                    <span style="color: red;">
                        {{ $errors->first('email') }}
                    </span>
                    @endif
            </div>
            
            <div class="links-group">
                <input class="btn-primary" type="submit" value="Enviar solicitud">
            </div>
        </form>
    </div>
</body>
</html>