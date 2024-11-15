<?php

namespace App\Console\Commands;

use App\Events\SurveyPublished;
use App\Library\SurveyLink;
use App\Models\Survey;
use Illuminate\Console\Command;

class DailyPublishSurveys extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:publish-survey';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send emails to all users enrolled in a activity with survey for published today.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $surveys = Survey::alreadyForPublish()
            ->whereHas("activity", fn($q) => $q->published())
            ->get();

        $this->info("Founded {$surveys->count()} surveys to publish.");

        foreach ($surveys as $survey) {
            $survey->publish();
            SurveyPublished::dispatch($survey);
        }
    }
}
