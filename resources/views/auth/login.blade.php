<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <link rel="stylesheet" href="{{ URL::asset('/') }}css/login.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Inicio de sesión</title>
    </head>
    <body>

         <!-- Page Container -->
        <div class="page-container">
                <!-- Page Inner -->
                <div class="page-inner login-page">
                    <div id="main-wrapper" class="container-fluid">
                        <div class="row">
                            <div class="col-sm-6 col-md-3 login-box">
                                <div class="img-block">
                                    <img src="{{ asset('images/logo-pro.png') }}" alt="logo">
                                </div>
                                <h4 class="login-title">Iniciar sesión</h4>
                                <form method="POST" action="{{ route('attemptLogin') }}" autocomplete="off">
                                    @csrf
                                    <div class="form-group">
                                        <i class="fas fa-envelope"></i>
                                        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" required autofocus placeholder="Usuario">
                                        @error('email')
                                            <p class="invalid-feedback" role="alert">
                                                <span>{{ $message }}</span>
                                            </p>
                                        @enderror
                                    </div>
                                    <div class="form-group">
                                        <i class="fas fa-lock"></i>
                                        <!-- <label for="exampleInputPassword1">Contraseña: </label> -->
                                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required placeholder="Contraseña">

                                        @error('password')
                                            <p class="invalid-feedback" role="alert">
                                                <span>{{ $message }}</span>
                                            </p>
                                        @enderror
                                    </div>
                                    <div class="links-group">
                                        <a href="/contraseña/restaurar" class="forgot-link">¿Olvidaste tu contraseña?</a>
                                        <input type="submit" class="btn-primary" value="Ingresar">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div><!-- /Page Content -->
        </div><!-- /Page Container -->
    </body>
</html>
