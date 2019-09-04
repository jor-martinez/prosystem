<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Resturar Contraseña</title>
</head>
<body>
    <form method="POST" action="/password/reset">
    @csrf

        <input type="hidden" name="token" value="{{ $token }}">

        <p class="form-row form-row-wide">
            <label for="email">Correo electrónico<span class="required">*</span></label>
            <input id="email" type="email" class="input-text {{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ $email ?? old('email') }}" required>

            @if ($errors->has('email'))
            <span style="color: red;">
                {{ $errors->first('email') }}
            </span>
            @endif
        </p>

        <p class="form-row form-row-wide">
            <label for="password">Contraseña<span class="required">*</span></label>
            <input id="password" type="password" class="input-text {{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

            @if ($errors->has('password'))
            <span style="color: red;">
                {{ $errors->first('password') }}
            </span>
            @endif
        </p>

        <p class="form-row form-row-wide">
            <label for="password-confirm">Confirme la contraseña<span class="required">*</span></label>
            <input id="password-confirm" type="password" class="input-text" name="password_confirmation" required>
        </p>

        <p class="form-row">
            <input class="button" type="submit" value="Restablecer">
        </p>
    </form>

</body>
</html>