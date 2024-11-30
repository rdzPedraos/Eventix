<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        "user_id",
        "teamable_id",
        "teamable_type",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function teamable()
    {
        return $this->morphTo();
    }
}
