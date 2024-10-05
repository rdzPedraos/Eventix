<?php

namespace App\Models;

use App\Observers\InscriptionObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(InscriptionObserver::class)]
class Inscription extends Model
{
    public $timestamps = false;

    use HasFactory;

    protected $fillable = [
        'user_id',
        'activity_id',
    ];

    /* RELATIONS */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
