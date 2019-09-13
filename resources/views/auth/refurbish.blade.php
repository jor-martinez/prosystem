<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ URL::asset('/') }}css/login.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <title>Resturar Contraseña</title>
</head>
<body>
    <div class="page-container">
        <div class="login-box">
            <div class="img-block">
                <img src="{{ asset('images/logo-pro.png') }}" alt="logo">
            </div>
            <h4 class="login-title">Ingresa tu nueva contraseña</h4>
            <form method="POST" action="/contraseña/restaurar" autocomplete="off">
            @csrf
                <input type="hidden" name="token" value="{{ $token }}">

                <div class="form-group">
                    <i class="fas fa-envelope"></i>
                    <!-- <label for="email">Correo electrónico<span class="required">*</span></label> -->
                    <input id="email" type="email" class="form-control {{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ $email ?? old('email') }}" required>

                    @if ($errors->has('email'))
                    <span style="color: red;">
                        {{ $errors->first('email') }}
                    </span>
                    @endif
                </div>

                <div class="form-group">
                    *<i class="fas fa-lock"></i>
                    <!-- <label for="password">Contraseña<span class="required">*</span></label> -->
                    <input id="password" type="password" class="form-control {{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required placeholder="Nueva contraseña">

                    @if ($errors->has('password'))
                    <span style="color: red;">
                        {{ $errors->first('password') }}
                    </span>
                    @endif
                </div>

                <div class="form-group">
                    *<i class="fas fa-lock"></i>
                    <!-- <label for="password-confirm">Confirme la contraseña<span class="required">*</span></label> -->
                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required placeholder="Repite la contraseña">
                </div>

                <div class="links-group">
                    <input class="btn-primary" type="submit" value="Restablecer">
                </div>
            </form>
        </div>
    </div>
</body>
</html>