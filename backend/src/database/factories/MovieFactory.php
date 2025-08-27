<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Movie;
use App\Models\User;

class MovieFactory extends Factory
{
    protected $model = Movie::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'release_year' => $this->faker->year(),
            'genre' => $this->faker->word(),
            'synopsis' => $this->faker->paragraph(),
            'poster_url' => $this->faker->imageUrl(),
            'user_id' => User::factory(),
        ];
    }
}
