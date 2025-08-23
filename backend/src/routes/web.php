<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/teste', function () {
    return response()->json(['Foi!!' => true]);
});
