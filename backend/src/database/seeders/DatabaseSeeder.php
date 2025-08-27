<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'jacto',
            'email' => 'jacto@jacto',
            'password' => bcrypt('jactoo'),
        ]);
        $this->call(MovieSeeder::class);
    }
}
