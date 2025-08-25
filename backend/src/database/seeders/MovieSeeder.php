<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movie;
use App\Models\User;

class MovieSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Movie::create([
            'title' => 'The Matrix',
            'release_year' => 1999,
            'genre' => 'Sci-Fi',
            'synopsis' => 'Um hacker descobre a verdadeira realidade.',
            'poster_url' => 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT02y0TxoVfAyvq_0JUN4VrOPU7FvWto51rF8BgDpR1lWtT5cxtvD8fjzQUxaBGBE6s3kMeV1L1hKqfvRVkKiOJwvRH6Bnv4zZ8xKbvgq3g',
            'watched' => true,
            'opinion' => 'Um filme inovador que mudou a forma como vemos ficção científica e a própria realidade. Sempre relevante e cheio de ação.',
            'user_id' => $user->id,
        ]);

        Movie::create([
            'title' => 'Interstellar',
            'release_year' => 2014,
            'genre' => 'Sci-Fi',
            'synopsis' => 'Exploração espacial para salvar a humanidade.',
            'poster_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLU74U4F6YVtruTkYMnEfFScMLRUoANlTM2x2k10odeS59k9htbr-U7uaq4msxZj92zVSyUEeYsBYMXdb4LAtf4R0aAlTYN0u599nzCBG-Eg',
            'watched' => true,
            'opinion' => 'Uma experiência visual e emocional incrível, explorando o amor, o tempo e o sacrifício. Nolan mais uma vez se supera.',
            'user_id' => $user->id,
        ]);

        Movie::create([
            'title' => 'Inception',
            'release_year' => 2010,
            'genre' => 'Sci-Fi',
            'synopsis' => 'Sonhos dentro de sonhos.',
            'poster_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZx0x-MvHcyUuwQVf85IHviN6zHumqfmo5UHiCxujzg5ZZZuimSEMM-VuAq0AfR7Zj0lPKazIgDxNG23FQV7ddtwnRgGmWmoNT04H8Jr2I',
            'watched' => true,
            'opinion' => 'Um thriller psicológico fascinante que mistura ação e complexidade mental. Cada cena provoca reflexão e emoção ao mesmo tempo.',
            'user_id' => $user->id,
        ]);

        Movie::create([
            'title' => 'Dune Part 2',
            'release_year' => 2024,
            'genre' => 'Sci-Fi',
            'synopsis' => 'Continuação da saga épica de Duna.',
            'poster_url' => 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQhWN_NDGLkF5w0Ui9o6_huMigkdI5J1cXsNiZh2czMckJIY0TbXypvPeTHy4LPtuPnWcbVj_jTqOaiwTY-kAo-veqQqN79SApsmf_3jDqh',
            'watched' => false,
            'opinion' => null,
            'user_id' => $user->id,
        ]);

        Movie::create([
            'title' => 'Avatar 2',
            'release_year' => 2022,
            'genre' => 'Fantasy',
            'synopsis' => 'A volta a Pandora.',
            'poster_url' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbR8bQ08BHUL9e6LXhYzry1wd2kN8JaZFL6Hzul1Vk8csw-zrM5jlUR0zMfqkYIsOE9VGsHEGW_L6ODhyP5tpBYMEI4K2gyisaGpRe8g8S',
            'watched' => false,
            'opinion' => null,
            'user_id' => $user->id,
        ]);

        Movie::create([
            'title' => 'Oppenheimer',
            'release_year' => 2023,
            'genre' => 'Drama',
            'synopsis' => 'História do criador da bomba atômica.',
            'poster_url' => 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTZDQHP8lzQOf-iO4KhZZhVSq8uXQSrT5ApmUn7SsfTzDAzTnGqZ-Hs9wQb7abddgltv4QwioSorqVavoZMqdDoutLOgx9slcpSF75KdZAfZg',
            'watched' => false,
            'opinion' => null,
            'user_id' => $user->id,
        ]);
    }
}
