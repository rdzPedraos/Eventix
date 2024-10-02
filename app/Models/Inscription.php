<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    public $timestamps = false;

    use HasFactory;

    protected $fillable = [
        'user_id',
        'activity_id',
    ];
}
