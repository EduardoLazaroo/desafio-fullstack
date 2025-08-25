<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'release_year',
        'genre',
        'synopsis',
        'poster_url',
        'user_id',
        'watched',
        'opinion',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
