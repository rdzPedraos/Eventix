<?php

namespace App\Console\Commands;

use App\Jobs\SendSurveyLink;
use App\Mail\SendSurveyMail;
use App\Models\Survey;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class PublishSurvey extends Command
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
        $this->info('Getting surveys...');

        $surveys = Survey::where("editable", false)
            ->where("published_at", null)
            ->where("trigger_date", "<=", now())
            ->whereHas("activity", fn($q) => $q->where("published_at", "!=", null))
            ->get();

        $this->info("Founded {$surveys->count()} surveys to publish.");

        foreach ($surveys as $survey) {
            $this->info("Getting users survey with id: {$survey->id}...");
            $users = $survey->activity->enrollments;

            $this->info("send to job {$users->count()} users for create links and send emails.");
            SendSurveyLink::dispatch($survey, $users->all());
            $survey->publish();
        }
    }
}
