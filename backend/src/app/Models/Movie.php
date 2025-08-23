<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = [
        'title',
        'release_year',
        'genre',
        'synopsis',
        'poster_url',
    ];
}
