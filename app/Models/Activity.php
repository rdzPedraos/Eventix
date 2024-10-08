<?php

namespace App\Models;

use App\Enums\PermissionEnum;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Activity extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'image',
        'color',
        'created_by',
    ];

    protected $casts = [
        'published_at' => "date",
    ];

    public function getIsPublishedAttribute()
    {
        return $this->published_at !== null;
    }

    public function publish()
    {
        if (!$this->published_at) {
            $this->published_at = now();
            $this->save();
        }
    }

    public function getLimitDates()
    {
        $this->load("schedulers");

        return [
            "start" => $this->schedulers->min("start_date"),
            "end" => $this->schedulers->max("end_date"),
        ];
    }

    /* SCOPES */

    public function scopePublished(Builder $query)
    {
        return $query->where("published_at", "!=", null);
    }

    public function scopeAccesibles(Builder $query)
    {
        $user = auth()->user();

        if (!$user) {
            throw new Exception("Need to be logged in");
        }

        return $user->hasPermissionTo(PermissionEnum::ACTIVITY_CHECK_ALL)
            ? $query
            : $query->where("created_by", $user->id);
    }

    public function scopeSearch(Builder $query, string|null $search)
    {
        if (!$search) return $query;

        return $query->where("name", "like", "%$search%")
            ->orWhere("description", "like", "%$search%");
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

    public function enrollments()
    {
        return $this->belongsToMany(User::class, "inscriptions")
            ->withPivot("registered_at");
    }
}
