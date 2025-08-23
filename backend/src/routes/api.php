<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmeController;
use App\Http\Controllers\AuthController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::apiResource('filmes', FilmeController::class);
