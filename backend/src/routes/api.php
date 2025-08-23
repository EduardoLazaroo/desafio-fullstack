<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Http\Controllers\FilmeController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', function () {
    $credentials = request(['email', 'password']);

    if ($token = JWTAuth::attempt($credentials)) {
        return response()->json(compact('token'));
    }

    return response()->json(['error' => 'Unauthorized'], 401);
});

Route::post('register', function () {
    $user = User::create([
        'name' => request('name'),
        'email' => request('email'),
        'password' => Hash::make(request('password')),
    ]);

    $token = JWTAuth::fromUser($user);

    return response()->json(compact('token'));
});

Route::apiResource('filmes', FilmeController::class);
