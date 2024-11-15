<?php

namespace App\Listeners;

use App\Events\SurveyPublished;
use App\Library\SurveyLink;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendSurveyLinkToEnrollments
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
    public function handle(SurveyPublished $event): void
    {
        $survey = $event->survey;
        $users = $survey->activity->enrollments;

        Log::info("Send emails", ["survey_id" => $survey->id, "users" => $users->count()]);

        foreach ($users as $user) {
            SurveyLink::send($user, $survey);
        }
    }
}
