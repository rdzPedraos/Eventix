<?php

namespace App\Models;

use App\Enums\ActivityStatusEnum;
use Exception;
use Illuminate\Database\Eloquent\Builder;
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

    public function isPublished()
    {
        return $this->status == ActivityStatusEnum::PUBLISHED;
    }

    public function scopePublished(Builder $query)
    {
        return $query->where("status", ActivityStatusEnum::PUBLISHED);
    }

    public function scopeAccesibles(Builder $query)
    {
        $user = auth()->user();

        if (!$user) {
            throw new Exception("Need to be logged in");
        }

        return $user->isSuperAdmin()
            ? $query
            : $query->where("created_by", $user->id);
    }

    public function getLimitDates()
    {
        $this->load("schedulers");
        $start_date = $this->schedulers->min("start_date");
        $end_date = $this->schedulers->max("end_date");

        return [
            "start_date" => $start_date,
            "end_date" => $end_date,
        ];
    }

    /* Relations */
    public function owner()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function schedulers()
    {
        return $this->hasMany(Scheduler::class);
    }

    public function surveys()
    {
        return $this->hasMany(Survey::class);
    }
}
