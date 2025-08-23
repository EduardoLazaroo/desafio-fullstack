<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MovieController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }

    public function index()
    {
        $movies = Movie::all();
        return response()->json($movies);
    }

    public function show($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        return response()->json($movie);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'release_year' => 'required|integer',
            'genre'        => 'required|string|max:255',
            'synopsis'     => 'required|string',
            'poster_url'   => 'nullable|url',
        ]);

        $movie = Movie::create($request->all());

        return response()->json($movie, 201);
    }

    public function update(Request $request, $id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        $request->validate([
            'title'        => 'required|string|max:255',
            'release_year' => 'required|integer',
            'genre'        => 'required|string|max:255',
            'synopsis'     => 'required|string',
            'poster_url'   => 'nullable|url',
        ]);

        $movie->update($request->all());

        return response()->json($movie);
    }

    public function destroy($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Movie not found'], 404);
        }

        $movie->delete();

        return response()->json(['message' => 'Movie deleted successfully']);
    }
}
