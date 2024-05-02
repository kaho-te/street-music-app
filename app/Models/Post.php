<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title','story','music','address','latitude','longitude','instrument_id','genre_id','r_instrument_id'];

    public function liked()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function instrument()
    {
        return $this->belongsTo(Instrument::class, 'instrument_id');
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

    public function r_instrument()
    {
        return $this->belongsTo(Instrument::class, 'r_instrument_id');
    }

    /**
    * 配列/JSONシリアル化の日付を準備
    *
    * @param  \DateTimeInterface  $date
    * @return string
    */
    protected function serializeDate(\DateTimeInterface $date)
    {
    return $date->format('Y/m/d H:i:s');
    }

}
