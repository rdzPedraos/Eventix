<?php

namespace App\Models;

use App\Enums\SurveyTriggerEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Survey extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'published_trigger',
        'trigger_date',
        "questions",
    ];

    protected $casts = [
        "published_trigger" => SurveyTriggerEnum::class,
        'trigger_date' => 'date',
        'published_at' => 'datetime',
    ];

    /* RELATIONS */

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
