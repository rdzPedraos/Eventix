<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnswerRequest;
use App\Http\Requests\AnswerStoreRequest;
use App\Library\DownloadCSV;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AnswerController extends Controller
{
    public function show(AnswerRequest $request)
    {
        $survey = Survey::findOrFail($request->survey_id)->load("questions");

        if ($survey->alreadyAnswered(Auth::user())) {
            return redirect()->route("home");
        }

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

    public function download(Survey $survey)
    {
        Gate::authorize("downloadReport", $survey);

        $name = str_replace(" ", "-", strtolower($survey->name));
        $questions = $survey->questions->pluck("label", "id");
        $answers = $survey->answers->pluck("answers");

        $document = (new DownloadCSV())
            ->setFilename("reporte-{$name}")
            ->addHeaders($questions)
            ->addBodyRows($answers);

        return response()->download($document->build())->deleteFileAfterSend(true);
    }
}
