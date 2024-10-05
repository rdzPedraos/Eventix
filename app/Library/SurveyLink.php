<?php

namespace App\Library;

use App\Mail\SendSurveyMail;
use Illuminate\Support\Facades\Mail;

class SurveyLink
{
    public static function send($user, $survey)
    {
        $crypted = encrypt(["user_id" => $user->id, "survey_id" => $survey->id]);
        $link = route("answer.show", ["token" => $crypted]);

        Mail::to($user->email)->send(new SendSurveyMail($survey, $link));
    }
}
