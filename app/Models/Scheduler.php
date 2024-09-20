<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scheduler extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'activity_id',
        'day',
        'start',
        'end',
    ];

    public $casts = [];


    public function setStartAttribute($value)
    {
        $this->attributes['start'] = Carbon::parse($value)->format('H:i:00');
    }

    public function setEndAttribute($value)
    {
        $this->attributes['end'] = Carbon::parse($value)->format('H:i:00');
    }


    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
