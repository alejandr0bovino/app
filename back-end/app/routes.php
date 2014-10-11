<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

/*Route::get('/', function()
{
	return View::make('hello');
});*/

Route::controller('books', 'BookController');





/////////////////




Route::get('me', array('before' => 'auth', 'uses' => 'UserController@getUser'));
Route::put('me', array('before' => 'auth', 'uses' => 'UserController@updateUser'));

Route::post('auth/login', 'AuthController@login');
Route::post('auth/signup', 'AuthController@signup');
Route::post('auth/facebook', 'AuthController@facebook');
Route::post('auth/foursquare', 'AuthController@foursquare');
Route::post('auth/github', 'AuthController@github');
Route::post('auth/google', 'AuthController@google');
Route::post('auth/linkedin', 'AuthController@linkedin');
Route::get('auth/twitter', 'AuthController@twitter');
Route::get('auth/unlink/{provider}', array('before' => 'auth', 'uses' => 'AuthController@unlink'));





/////////////////


// all routes that are not home or api will be redirected to the frontend
// this allows angular to route them
App::missing(function($exception) {
    return View::make('hello');
});

