<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypesEnum;
use App\Enums\SurveyTriggerEnum;
use App\Http\Requests\CreateSurveyRequest;
use App\Http\Requests\SurveyRequest;
use App\Http\Resources\SurveyListResource;
use App\Models\Activity;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize("viewAny", Survey::class);

        $activity = $request->input("activity");
        if ($activity) $activity = Activity::find($activity);

        $activities = $activity ?? Activity::editables();

        $surveys = Survey::withTrashed()
            ->search($request->input("search"))
            ->whereIn("activity_id", $activities->pluck("id"))
            ->with("activity")
            ->orderBy("created_at", "desc")
            ->paginate($request->input("per_page", 10));

        $surveys = SurveyListResource::collection($surveys);

        return Inertia::render("Survey/List", compact('surveys', "activity"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(CreateSurveyRequest $request)
    {
        Gate::authorize("create", Survey::class);

        $survey = new Survey([
            "activity_id" => $request->input("activity_id"),
        ]);

        $questionTypes = QuestionTypesEnum::casesKeyLabel();
        $triggerTypes = SurveyTriggerEnum::casesKeyLabel();

        return Inertia::render("Survey/Edit", compact('survey', "questionTypes", "triggerTypes"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize("create", Survey::class);

        $validated = $request->validate([
            ...(new CreateSurveyRequest)->rules(),
            ...(new SurveyRequest)->rules()
        ]);

        DB::beginTransaction();

        try {
            $survey = Survey::create($validated);
            $survey->questions()->createMany($request->questions);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(__("validation.throw_exception"));
        }

        return redirect()->route("surveys.edit", $survey);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey)
    {
        $survey->load("questions");
        return Inertia::render("Survey/Show", compact('survey'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Survey $survey)
    {
        Gate::authorize("update", $survey);

        if ($survey->blocked) {
            return redirect()->route("surveys.index");
        }

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
    public function destroy(Survey $survey)
    {
        Gate::authorize("delete", $survey);
        $survey->delete();
        return redirect()->route("surveys.index");
    }
}
