<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnswerRequest;
use App\Http\Requests\AnswerStoreRequest;
use App\Models\Survey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnswerController extends Controller
{
    public function show(AnswerRequest $request)
    {
        $survey = Survey::findOrFail($request->survey_id)->load("questions");
        $token = $request->route("token");

        return Inertia::render("Survey/Answer", compact('survey', "token"));
    }

    public function store(AnswerStoreRequest $request)
    {
        $answers = $request->validated();
        unset($answers["survey_id"], $answers["user_id"]);

        $survey = Survey::findOrFail($request->survey_id);
        $survey->answers()->create([
            "user_id" => $request->user_id,
            "answers" => $answers
        ]);

        return redirect()->route("home");
    }
}
