<?php
use App\Mail\Password;
// Login
Route::get('/login', 'Auth\LoginController@showLoginForm') -> name('showLoginForm');
Route::post('/login', 'Auth\LoginController@login') -> name('attemptLogin');
Route::get('/logout', 'Auth\LoginController@logout') -> name('logout');

//Recuperación de contraseña
Route::get('/recuperacion', 'Auth\ClaveController@index');
Route::post('/enviado', 'Auth\ClaveController@enviar');
Route::get('/recuperar', 'Auth\ClaveController@store');

// Password Reset
Route::post('/password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')
-> name('password.email');

Route::get('/password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')
  -> name('password.request');

Route::post('/password/reset', 'Auth\ResetPasswordController@reset');

Route::get('/password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')
-> name('password.reset');


// Front

Route::prefix('api') -> group(function() {

    Route::get('blog', 'Api\MainController@blog');
    Route::get('caracteristicas', 'Api\MainController@caracteristicas');
    Route::get('empresa', 'Api\MainController@empresa');
    Route::get('historia', 'Api\MainController@historia');
    Route::get('marca', 'Api\MainController@marcas');
    Route::get('nosotros', 'Api\MainController@nosotros');
    Route::get('proceso', 'Api\MainController@proceso');
    Route::get('productos', 'Api\MainController@productos');
    Route::get('servicios', 'Api\MainController@servicios');
    Route::get('valores', 'Api\MainController@valores');
    //Route::get('usuarios', 'Api\MainController@usuarios');
    Route::get('slyder', 'Api\MainController@slyder');
});

Route::middleware(['auth:admin']) -> group(function() {

    // API
  	Route::prefix('dev') -> group(function() {

      //BLOG
      Route::prefix('blog')->group(function(){
        Route::get('/', 'Api\BlogController@index');
        Route::post('/nueva', 'Api\BlogController@store');
        Route::post('/editar/{id}', 'Api\BlogController@update');
        Route::delete('/borrar/{id}', 'Api\BlogController@destroy');
      });

      //CARACTERISTICAS
      Route::prefix('caracteristicas')->group(function(){
        Route::get('/', 'Api\CaracteristicasController@index');
        Route::post('/nueva', 'Api\CaracteristicasController@store');
        Route::post('/editar/{id}', 'Api\CaracteristicasController@update');
        Route::delete('/borrar/{id}', 'Api\CaracteristicasController@destroy');
      });

      //EMPRESA
      Route::prefix('empresa') -> group(function() {
        Route::get('/', 'Api\EmpresaController@index');
        Route::post('/nueva', 'Api\EmpresaController@store');
        Route::post('/editar/{id}', 'Api\EmpresaController@update');
        Route::delete('/borrar/{id}', 'Api\EmpresaController@destroy');
      });

      //HISTORIA
      Route::prefix('historia') -> group(function() {
        Route::get('/', 'Api\HistoriaController@index');
        Route::post('/nueva', 'Api\HistoriaController@store');
        Route::post('/editar/{id}', 'Api\HistoriaController@update');
        Route::delete('/borrar/{id}', 'Api\HistoriaController@destroy');
      });

      //MARCAS
      Route::prefix('marcas') -> group(function() {
        Route::get('/', 'Api\MarcasController@index');
        Route::post('/nueva', 'Api\MarcasController@store');
        Route::delete('/borrar/{id}', 'Api\MarcasController@destroy');
      });

      //NOSOTROS
      Route::prefix('nosotros')->group(function(){
        Route::get('/', 'Api\NosotrosController@index');
        Route::post('/nueva', 'Api\NosotrosController@store');
        Route::post('/editar/{id}', 'Api\NosotrosController@update');
        Route::delete('/borrar/{id}', 'Api\NosotrosController@destroy');
      });

      //PROCESO
      Route::prefix('proceso') ->group(function(){
        Route::get('/', 'Api\ProcesoController@index');
        Route::post('/nueva', 'Api\ProcesoController@store');
        Route::post('/editar/{id}', 'Api\ProcesoController@update');
        Route::delete('/borrar/{id}', 'Api\ProcesoController@destroy');
      });

      //PRODUCTOS
      Route::prefix('productos') ->group(function(){
        Route::get('/', 'Api\ProductosController@index');
        Route::post('/nueva', 'Api\ProductosController@store');
        Route::post('/editar/{id}', 'Api\ProductosController@update');
        Route::delete('/borrar/{id}', 'Api\ProductosController@destroy');
      });

      //VALORES
      Route::prefix('valores') -> group(function() {
        Route::get('/', 'Api\ValoresController@index');
        Route::post('/nueva', 'Api\ValoresController@store');
        Route::post('/editar/{id}', 'Api\ValoresController@update');
        Route::delete('/borrar/{id}', 'Api\ValoresController@destroy');
      });

      //SERVICIOS
      Route::prefix('servicios') ->group(function(){
        Route::get('/', 'Api\ServiciosController@index');
        Route::post('/nueva', 'Api\ServiciosController@store');
        Route::post('/editar/{id}', 'Api\ServiciosController@update');
        Route::delete('/borrar/{id}', 'Api\ServiciosController@destroy');
      });

      //SLYDER
      Route::prefix('slyder') -> group(function(){
        Route::get('/', 'Api\SlyderController@index');
        Route::post('/nuevo', 'Api\SlyderController@store');
        Route::post('/modificar/{id}', 'Api\SlyderController@update');
        Route::delete('/borrar/{id}', 'Api\SlyderController@destroy');
      });

      //USUARIO
      Route::prefix('usuario') -> group(function(){
        Route::get('/', 'Api\UsuarioController@index');
        Route::post('/nuevo', 'Api\UsuarioController@store');
        Route::post('/modificar/{id}', 'Api\UsuarioController@update');
        Route::post('/modificarclave/{id}', 'Api\UsuarioController@clave');
        Route::delete('/borrar/{id}', 'Api\UsuarioController@destroy');
      });

    });

    Route::get('/admin/obtener-info', 'Api\UsuarioController@show');
    Route::get('/admin/{path?}', function () {
      return view('admin');
    });

});

Route::get('/{path?}', function () {
  return view('main');
});

