<?php

namespace App\Observers;

use App\Events\SurveyPublished;
use App\Models\Survey;

class SurveyObserver
{
    /**
     * Handle the Survey "created" event.
     */
    public function created(Survey $survey): void
    {
        Survey::withoutEvents(function () use ($survey) {
            $survey->updatePublishedTrigger();
        });
    }

    /**
     * Handle the Survey "updated" event.
     */
    public function updated(Survey $survey): void
    {
        Survey::withoutEvents(function () use ($survey) {
            if ($survey->isDirty("published_trigger")) {
                $survey->updatePublishedTrigger();
            }

            if ($survey->alreadyForPublish()) {
                $survey->publish();
                SurveyPublished::dispatch($survey);
            }
        });
    }

    /**
     * Handle the Survey "deleted" event.
     */
    public function deleted(Survey $survey): void
    {
        //
    }

    /**
     * Handle the Survey "restored" event.
     */
    public function restored(Survey $survey): void
    {
        //
    }

    /**
     * Handle the Survey "force deleted" event.
     */
    public function forceDeleted(Survey $survey): void
    {
        //
    }
}
