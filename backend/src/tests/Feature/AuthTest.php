<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function usuario_pode_registrar()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'jacto',
            'email' => 'jacto@jacto.com',
            'password' => 'jactoo',
            'password_confirmation' => 'jactoo'
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['token']);
    }

    #[Test]
    public function usuario_pode_logar_com_credenciais_validas()
    {
        $user = User::factory()->create([
            'password' => bcrypt('jactoo')
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'jactoo'
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token']);
    }

    #[Test]
    public function login_falha_com_senha_invalida()
    {
        $user = User::factory()->create([
            'password' => bcrypt('jactoo')
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'errada'
        ]);

        $response->assertStatus(401);
    }
}
