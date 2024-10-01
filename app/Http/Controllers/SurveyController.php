<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypesEnum;
use App\Enums\SurveyTriggerEnum;
use App\Http\Requests\SurveyRequest;
use App\Http\Resources\SurveyListResource;
use App\Models\Activity;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $activities = Activity::accesibles()->pluck("id");

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
    public function update(SurveyRequest $request, Survey $survey)
    {
        DB::beginTransaction();

        try {
            $survey->update($request->validated());
            $survey->questions()->delete();
            $survey->questions()->createMany($request->questions);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(__("validation.throw_exception"));
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey)
    {
        //
    }
}
