<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Movie;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class MovieTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser($this->user);
    }

    #[Test]
    public function pode_criar_um_filme_via_api()
    {
        $response = $this->postJson('/api/movies', [
            'title' => 'Matrix',
            'release_year' => 1999,
            'genre' => 'Sci-Fi',
            'synopsis' => 'Um hacker descobre a realidade.',
            'poster_url' => ''
        ], [
            'Authorization' => "Bearer {$this->token}"
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment(['title' => 'Matrix']);

        $this->assertDatabaseHas('movies', ['title' => 'Matrix']);
    }

    #[Test]
    public function pode_listar_filmes_via_api()
    {
        Movie::factory()->count(2)->create(['user_id' => $this->user->id]);

        $response = $this->getJson('/api/movies', [
            'Authorization' => "Bearer {$this->token}"
        ]);

        $response->assertStatus(200)
            ->assertJsonCount(2);
    }

    #[Test]
    public function pode_atualizar_um_filme_via_api()
    {
        $movie = Movie::factory()->create(['user_id' => $this->user->id]);

        $response = $this->putJson("/api/movies/{$movie->id}", [
            'title' => 'Matrix Reloaded',
            'release_year' => $movie->release_year,
            'genre' => $movie->genre,
            'synopsis' => $movie->synopsis,
            'poster_url' => $movie->poster_url
        ], [
            'Authorization' => "Bearer {$this->token}"
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Matrix Reloaded']);
    }

    #[Test]
    public function pode_deletar_um_filme_via_api()
    {
        $movie = Movie::factory()->create(['user_id' => $this->user->id]);

        $response = $this->deleteJson("/api/movies/{$movie->id}", [], [
            'Authorization' => "Bearer {$this->token}"
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('movies', ['id' => $movie->id]);
    }
}
