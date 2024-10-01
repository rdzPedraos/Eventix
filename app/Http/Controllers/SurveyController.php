<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypesEnum;
use App\Enums\SurveyTriggerEnum;
use App\Http\Resources\SurveyListResource;
use App\Models\Survey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $activities = $request->user()->accesibleActivities()->select("id")->get();
        $surveys = Survey::whereIn("activity_id", $activities)->paginate($request->input("per_page", 10));
        $surveys = SurveyListResource::collection($surveys);

        return Inertia::render("Survey/List", compact('surveys'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Survey $survey)
    {
        $survey->load("questions");
        $questionTypes = QuestionTypesEnum::casesKeyLabel();
        $triggerTypes = SurveyTriggerEnum::casesKeyLabel();

        return Inertia::render("Survey/Edit", compact('survey', "questionTypes", "triggerTypes"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Survey $survey)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey)
    {
        //
    }
}
