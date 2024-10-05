<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scheduler extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'activity_id',
        'start_date',
        'end_date',
        "site_id",
    ];

    public $casts = [
        "start_date" => "datetime",
        "end_date" => "datetime",
    ];

    public function scopeSearch($query, $search, $enrolled, $site, $ignoreActivity)
    {
        return $query
            ->whereHas('activity', function ($query) use ($search, $enrolled, $ignoreActivity) {
                $query->published()
                    ->when($search, fn($query) => $query->where('name', 'like', "%$search%"))
                    ->when($ignoreActivity, fn($query) => $query->where('id', '!=', $ignoreActivity));

                if ($enrolled) {
                    $user_id = auth()->id();
                    $query->whereHas('enrollments', fn($query) => $query->where('user_id', $user_id));
                }
            })
            ->when($site, function ($query, $site) {
                $query->where('site_id', $site);
            });
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
