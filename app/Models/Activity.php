<?php

namespace App\Models;

use App\Enums\ActivityStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        "status",
        'color',
        'created_by',
    ];

    //castea la columna status con el enum ActivityStatusEnum para que use el label, si uso directamente ActivityStatusEnum::class parece que no lo toma.
    protected $casts = [
        'status' => ActivityStatusEnum::class,
    ];


    /* Relations */
    public function owner()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function schedulers()
    {
        return $this->hasMany(Scheduler::class);
    }
}
