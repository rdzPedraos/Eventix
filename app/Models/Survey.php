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
        "activity_id",
        'description',
        'published_trigger',
        'trigger_date',
    ];

    protected $casts = [
        "published_trigger" => SurveyTriggerEnum::class,
        'trigger_date' => 'date',
        'published_at' => 'date',
        'editable' => 'boolean',
    ];

    protected $dates = [
        'trigger_date',
        'published_at',
    ];

    public function getIsPublishedAttribute()
    {
        return $this->published_at !== null;
    }

    public function getBlockedAttribute()
    {
        return !$this->editable;
    }

    public function block()
    {
        $this->editable = false;
        $this->save();
    }

    public function publish()
    {
        $this->published_at = now();
        $this->save();
    }

    /* RELATIONS */
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
