<?php

namespace App\Observers;

use App\Library\SurveyLink;
use App\Models\Inscription;

class InscriptionObserver
{
    /**
     * Handle the Inscription "created" event.
     */
    public function created(Inscription $inscription): void
    {
        $user = $inscription->user;
        $surveys = $inscription->activity->surveys()->published()->alreadyAnswered($user)->get();

        dispatch(function () use ($user, $surveys) {
            foreach ($surveys as $survey) {
                SurveyLink::send($user, $survey);
            }
        });
    }

    /**
     * Handle the Inscription "updated" event.
     */
    public function updated(Inscription $inscription): void
    {
        //
    }

    /**
     * Handle the Inscription "deleted" event.
     */
    public function deleted(Inscription $inscription): void
    {
        //
    }

    /**
     * Handle the Inscription "restored" event.
     */
    public function restored(Inscription $inscription): void
    {
        //
    }

    /**
     * Handle the Inscription "force deleted" event.
     */
    public function forceDeleted(Inscription $inscription): void
    {
        //
    }
}
