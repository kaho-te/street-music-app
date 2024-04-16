<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function r_user()
    {
        return $this->belongsTo(User::class, 'r_user_id', 'id');
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
