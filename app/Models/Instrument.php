<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instrument extends Model
{
    use HasFactory;

    public function posts()
    {
        return $this->hasMany(Post::class, 'instrument_id');
    }

    public function r_posts()
    {
        return $this->hasMany(Post::class, 'r_instrument_id');
    }
}
