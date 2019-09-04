<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Recuperación de contraseña</title>
</head>
<body>
    <form>
        {{ csrf_token() }}
        <h1>Este email ha sido enviado debido a que se solicitó una restauración</h1>
        <h2>Da click <a href="http://localhost:8000/recuperar">aqui</a> para poder hacerlo. </h2>
        <h3>Sí no has solicitado el servicio, omite este mensaje.</h3>
    </form>
    
</body>
</html>