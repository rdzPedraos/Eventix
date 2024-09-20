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
        'day',
        'start',
        'end',
    ];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
