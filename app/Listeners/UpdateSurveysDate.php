<?php

namespace App\Listeners;

use App\Enums\SurveyTriggerEnum;
use App\Events\ActivityScheduleUpdate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldQueueAfterCommit;
use Illuminate\Queue\InteractsWithQueue;

class UpdateSurveysDate implements ShouldQueueAfterCommit
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ActivityScheduleUpdate $event): void
    {
        $surveys = $event->activity->surveys()
            ->where("published_trigger", SurveyTriggerEnum::TO_END)
            ->orWhere("published_trigger", SurveyTriggerEnum::TO_START)
            ->with("activity")
            ->get();

        $surveys->each(function ($survey) {
            if ($survey->isPublished) return;
            $survey->updatePublishedTrigger();
        });
    }
}
