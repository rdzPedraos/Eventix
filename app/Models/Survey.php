<?php

namespace App\Models;

use App\Enums\SurveyTriggerEnum;
use App\Observers\SurveyObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[ObservedBy(SurveyObserver::class)]
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

    public function updatePublishedTrigger()
    {
        if ($this->published_trigger === SurveyTriggerEnum::CUSTOM->value) return;

        $activity = $this->activity;
        $limit_dates = $activity->getLimitDates();

        $this->update([
            "trigger_date" => $this->published_trigger === SurveyTriggerEnum::TO_END
                ? $limit_dates["end"]
                : $limit_dates["start"],
        ]);
    }

    public function getIsPublishedAttribute()
    {
        return $this->published_at !== null;
    }

    public function getBlockedAttribute()
    {
        return !$this->editable;
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
