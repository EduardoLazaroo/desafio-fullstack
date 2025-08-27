<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class UserTest extends TestCase
{
    use RefreshDatabase;
    #[Test]
    public function pode_criar_um_usuario()
    {
        $user = User::factory()->create([
            'name' => 'Jacto',
            'email' => 'jacto@jacto.com',
            'password' => 'jactoo'
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'jacto@jacto.com'
        ]);

        $this->assertEquals('Jacto', $user->name);
    }
    #[Test]
    public function usuario_tem_relacao_com_filmes()
    {
        $user = User::factory()->create();
        $movie = $user->movies()->create([
            'title' => 'Matrix',
            'release_year' => 1999,
            'genre' => 'Sci-Fi',
            'synopsis' => 'Um hacker descobre a realidade.',
            'poster_url' => ''
        ]);

        $this->assertEquals(1, $user->movies()->count());
        $this->assertEquals('Matrix', $user->movies()->first()->title);
    }
}
