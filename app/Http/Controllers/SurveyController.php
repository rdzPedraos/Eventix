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
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Activity $activity, Request $request)
    {
        Gate::authorize("view", $activity->surveys()->make());

        $surveys = $activity->surveys()
            ->withTrashed()
            ->search($request->input("search"))
            ->orderBy("created_at", "desc")
            ->paginate($request->input("per_page", 10));

        $surveys = SurveyListResource::collection($surveys);

        return Inertia::render("Survey/List", compact('activity', 'surveys', "activity"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Activity $activity, Request $request)
    {
        Gate::authorize("create", Survey::class);

        $survey = $activity->surveys()->make();

        $questionTypes = QuestionTypesEnum::casesKeyLabel();
        $triggerTypes = SurveyTriggerEnum::casesKeyLabel();

        return Inertia::render("Survey/Edit", compact('survey', "questionTypes", "triggerTypes", "activity"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Activity $activity, SurveyRequest $request)
    {
        Gate::authorize("create", Survey::class);

        DB::beginTransaction();

        try {
            $survey = Survey::create($request->validated());
            $survey->questions()->createMany($request->questions);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(__("validation.throw_exception"));
        }

        return redirect()->route("surveys.edit", compact("activity", "survey"));
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity, Survey $survey)
    {
        $survey->load("questions");
        return Inertia::render("Survey/Show", compact('survey', "activity"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activity $activity, Survey $survey)
    {
        Gate::authorize("update", $survey);

        if ($survey->blocked) {
            return redirect()->route("surveys.index", compact("activity"));
        }

        $survey->load("questions");
        $questionTypes = QuestionTypesEnum::casesKeyLabel();
        $triggerTypes = SurveyTriggerEnum::casesKeyLabel();

        return Inertia::render("Survey/Edit", compact('survey', "questionTypes", "triggerTypes", "activity"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Activity $activity, Survey $survey, SurveyRequest $request,)
    {
        Gate::authorize("update", $survey);

        DB::beginTransaction();

        try {
            $survey->update($request->validated());
            $survey->questions()->delete();
            $survey->questions()->createMany($request->questions);

            if ($request->input("publish")) $survey->block();

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
    public function destroy(Activity $activity, Survey $survey)
    {
        Gate::authorize("delete", $survey);
        $survey->delete();
        return redirect()->route("surveys.index", compact("activity"));
    }
}
