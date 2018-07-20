<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'cors', 'prefix' => '/v1'], function () {
    Route::post('/login', 'LoginController@authenticate');
    Route::post('/register', 'LoginController@register');
    Route::get('/logout/{api_token}', 'LoginController@logout');
	
	// Player routes
	Route::group(['prefix'=>'/player'],function(){
		Route::get('/datatable','PlayerController@datatable');
		Route::get('/get/{id}','PlayerController@getOne');
		Route::post('/add','PlayerController@tambahData');
		Route::post('/update','PlayerController@updateData');
		Route::post('/delete','PlayerController@deleteData');
	});
	// Game routes
	Route::group(['prefix'=>'/game'],function(){
		Route::get('/datatable','GameController@datatable');
		Route::get('/get/{id}','GameController@getOne');
		Route::post('/add','GameController@tambahData');
		Route::post('/update','GameController@updateData');
		Route::post('/delete','GameController@deleteData');
	});
});