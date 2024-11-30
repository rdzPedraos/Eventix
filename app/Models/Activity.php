<?php

namespace App\Models;

use App\Enums\ColorEnum;
use App\Enums\PermissionEnum;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

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
        'color' => ColorEnum::class,
    ];

    /* OTHER METHODS */

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

    public function authorizedUser(User $user, $only_owner = false)
    {
        $user ??= Auth::user();

        if ($this->owner->id === $user->id) return true;
        return !$only_owner && $this->builders()->where("user_id", $user->id)->exists();
    }

    /* DYNAMIC ATTRIBUTES */

    public function getIsPublishedAttribute()
    {
        return $this->published_at !== null;
    }

    /* SCOPES */

    public function scopePublished(Builder $query)
    {
        return $query->where("published_at", "!=", null);
    }

    public function scopeEditables(Builder $query)
    {
        $user = Auth::user();

        if (!$user) {
            throw new Exception("Need to be logged in");
        }

        if ($user->hasPermissionTo(PermissionEnum::ACTIVITY_CHECK_ALL)) {
            return $query;
        }

        return $query->where("created_by", $user->id)->orWhereHas("builders", function ($query) use ($user) {
            $query->where("user_id", $user->id);
        });
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

    public function builders()
    {
        return $this->morphToMany(User::class, "teamable", Team::class);
    }
}
