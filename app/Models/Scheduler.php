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

    public function scopeSearch($query, $search, $site, $excepActivity)
    {
        return $query
            ->whereHas('activity', function ($query) use ($search, $excepActivity) {
                $query->published();

                if ($search) $query->where('name', 'like', "%$search%");
                if ($excepActivity) $query->where('id', '!=', $excepActivity);
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
