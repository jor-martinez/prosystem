<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Recuperación de contraseña</title>
</head>
<body>
    <form method="post" action="/contraseña/correo">
        {{ csrf_field() }}
        <p class="form-row form-row-wide">
            <label>Correo electrónico<span class="required">*</span></label>
            <input id="email" type="email" class="input-text {{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>

            @if ($errors->has('email'))
            <span style="color: red;">
                {{ $errors->first('email') }}
            </span>
            @endif
        </p>

        <p class="form-row">
            <input class="button" type="submit" value="Enviar solicitud">
        </p>
    </form>
</body>
</html>