<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\AuthController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::middleware('auth:api')->group(function () {
    Route::get('movies/latest-unwatched', [MovieController::class, 'latestUnwatched']);
    Route::get('movies/latest-watched', [MovieController::class, 'latestWatched']);
    Route::apiResource('movies', MovieController::class);
});
