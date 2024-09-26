<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Survey extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'published_trigger',
        'trigger_date',
    ];

    protected $casts = [
        'trigger_date' => 'date',
        'published_at' => 'datetime',
    ];
}
