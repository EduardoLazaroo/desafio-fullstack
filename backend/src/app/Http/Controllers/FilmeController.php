<?php

namespace App\Http\Controllers;

use App\Models\Filme;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class FilmeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }

    public function index()
    {
        $filmes = Filme::all();
        return response()->json($filmes);
    }

    public function show($id)
    {
        $filme = Filme::find($id);

        if (!$filme) {
            return response()->json(['message' => 'Filme não encontrado'], 404);
        }

        return response()->json($filme);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'ano_lancamento' => 'required|integer',
            'genero' => 'required|string|max:255',
            'sinopse' => 'required|string',
            'url_poster' => 'nullable|url',
        ]);

        $filme = Filme::create($request->all());

        return response()->json($filme, 201);
    }

    public function update(Request $request, $id)
    {
        $filme = Filme::find($id);

        if (!$filme) {
            return response()->json(['message' => 'Filme não encontrado'], 404);
        }

        $request->validate([
            'titulo' => 'required|string|max:255',
            'ano_lancamento' => 'required|integer',
            'genero' => 'required|string|max:255',
            'sinopse' => 'required|string',
            'url_poster' => 'nullable|url',
        ]);

        $filme->update($request->all());

        return response()->json($filme);
    }

    public function destroy($id)
    {
        $filme = Filme::find($id);

        if (!$filme) {
            return response()->json(['message' => 'Filme não encontrado'], 404);
        }

        $filme->delete();

        return response()->json(['message' => 'Filme excluído com sucesso']);
    }
}
