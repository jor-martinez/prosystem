<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />

        <meta name="csrf-token" content="{{ csrf_token() }}">


        <title>Reestablecer contraseña | Cotizador</title>

        <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('assets/images/favicon/android-icon-192x192.png') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('assets/images/favicon/favicon-32x32.png') }}">
        <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('assets/images/favicon/favicon-96x96.png') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('assets/images/favicon/favicon-16x16.png') }}">

        <link rel="manifest" href="{{ asset('assets/images/favicon/manifest.js') }}">

        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">

        <style>
            body{
                font-family: 'Roboto', sans-serif;
            }
            .email-containor{
                text-align: center;
            }
            .email-containor img{
                margin: 50px 0 20px 0;
            }
            .email-containor .login-title{
                font-weight: 200;
                font-size: 28px;
                margin: 10px 0;
            }
            .email-containor > p{
                font-size: 16px;
                font-weight: 100;
                margin: 30px 0;
            }
            .email-containor form{
                margin: 40px 0;
            }
            .email-containor form > span{
                border-radius: 5px;
                background: #03A9F4;
                padding: 10px 20px;
                transition: all .5s ease-in-out;
            }
            .email-containor form > span:hover{
                background: #0288D1;
            }
            .email-containor form > span > a{
                text-decoration: none;
                color: #fff;
            }
        </style> 
</head>
<body>

<div class="email-containor">
        <center>
            <img src="{{ asset('images/prosystem/brand-white.png') }}" width="100px" alt="logo">
        </center>
        <h2 class="login-title">Reestableciemiento de contraseña</h2>
        <p>Estás recibiendo este correo porque hiciste una solicitud de reestablecimiento de contraseña para tu cuenta.
            <br/>
            <br/>
            Haz click en el siguiente enlace, para poder reestablecer tu contraseña.
        </p>
        <form method="POST" action="/password/reset">
            <span><a href="{{url('/contraseña/restaurar/'.$token)}}">Reestablecer contraseña</a></span>
        </form>
    </div>


</body>
</html>
