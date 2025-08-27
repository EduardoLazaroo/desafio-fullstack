<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Registrar um novo usuário e gerar o token JWT.
     */
    public function register(Request $request)
    {
        $start = microtime(true);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);
        Log::info('Validação levou: ' . (microtime(true) - $start) . 's');

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $beforeUser = microtime(true);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        Log::info('Criação do usuário levou: ' . (microtime(true) - $beforeUser) . 's');

        $beforeToken = microtime(true);
        $token = JWTAuth::fromUser($user);
        Log::info('Geração do token levou: ' . (microtime(true) - $beforeToken) . 's');

        Log::info('Tempo total: ' . (microtime(true) - $start) . 's');

        return response()->json(compact('token'), 201);
    }

    /**
     * Fazer login e gerar o token JWT.
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($token = JWTAuth::attempt($credentials)) {
            return response()->json(compact('token'));
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
