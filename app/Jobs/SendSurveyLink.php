<?php

namespace App\Jobs;

use App\Mail\SendSurveyMail;
use App\Models\Survey;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendSurveyLink implements ShouldQueue
{
    use Queueable;

    protected array $users;
    protected Survey $survey;

    /**
     * Create a new job instance.
     */
    public function __construct(Survey $survey, array $users)
    {
        $this->users = $users;
        $this->survey = $survey;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $survey = $this->survey;

        foreach ($this->users as $user) {
            $crypted = encrypt(["user_id" => $user->id, "survey_id" => $survey->id]);
            $link = route("answer.show", ["token" => $crypted]);

            Mail::to($user->email)->send(new SendSurveyMail($survey, $link));
        }
    }
}
