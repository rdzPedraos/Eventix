<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Inscription;
use App\Models\Question;
use App\Models\Scheduler;
use App\Models\Survey;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ActivitiesSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $activities = Activity::factory(10)->create();
        Scheduler::factory(15)->create();

        /* Avoid activities publsihed with null schedulers */
        foreach ($activities as $activity) {
            if ($activity->isPublished) {
                Scheduler::factory(1)->create([
                    'activity_id' => $activity->id
                ]);

                # Not use factory(n) because it will create n new inscriptions without checking if the user is already enrolled 
                Inscription::factory()->withActivity($activity->id)->create();
                Inscription::factory()->withActivity($activity->id)->create();
                Inscription::factory()->withActivity($activity->id)->create();
            }
        }

        $surveys = Survey::factory(6)->create();
        foreach ($surveys as $survey) {
            Question::factory(3)->create([
                'survey_id' => $survey->id
            ]);
        }
    }
}
