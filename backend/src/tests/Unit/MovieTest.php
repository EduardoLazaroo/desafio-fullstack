<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Movie;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class MovieTest extends TestCase
{
    use RefreshDatabase;
    #[Test]
    public function pode_criar_um_filme()
    {
        $user = User::factory()->create();
        $movie = Movie::create([
            'title' => 'Matrix',
            'release_year' => 1999,
            'genre' => 'Sci-Fi',
            'synopsis' => 'Um hacker descobre a realidade.',
            'poster_url' => '',
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('movies', [
            'title' => 'Matrix'
        ]);
        $this->assertEquals('Sci-Fi', $movie->genre);
    }
    #[Test]
    public function um_filme_pode_pertencer_a_um_usuario()
    {
        $user = User::factory()->create();
        $movie = $user->movies()->create([
            'title' => 'Inception',
            'release_year' => 2010,
            'genre' => 'Sci-Fi',
            'synopsis' => 'Sonhos dentro de sonhos',
            'poster_url' => ''
        ]);

        $this->assertEquals($user->id, $movie->user_id);
    }
}
