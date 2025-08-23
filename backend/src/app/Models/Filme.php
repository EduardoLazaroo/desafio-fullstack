<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filme extends Model
{
    protected $fillable = [
        'titulo',
        'ano_lancamento',
        'genero',
        'sinopse',
        'url_poster',
    ];
}
