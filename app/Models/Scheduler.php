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
        'start_date',
        'end_date',
    ];

    public $casts = [
        "start_date" => "datetime",
        "end_date" => "datetime",
    ];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
