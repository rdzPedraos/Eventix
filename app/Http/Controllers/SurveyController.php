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
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $activities = Activity::accesibles();
        $activity_id = $request->input("activity");

        if ($activity_id) {
            $activities = $activities->where("id", $activity_id);
        }

        $surveys = Survey::whereIn("activity_id", $activities->pluck("id"))
            ->with("activity")
            ->paginate($request->input("per_page", 10));

        $surveys = SurveyListResource::collection($surveys);

        return Inertia::render("Survey/List", compact('surveys', "activity_id"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(CreateSurveyRequest $request)
    {
        $survey = new Survey([
            "activity_id" => $request->input("activity_id"),
            "questions" => []
        ]);

        return $this->edit($survey);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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

    public function answer(Request $request)
    {
        $token = decrypt($request->token);

        if (!isset($token["user_id"]) || !isset($token["survey_id"])) {
            abort(404);
        }

        $user = User::find($token["user_id"]);
        if ($user != Auth::user()) {
            abort(401);
        }

        $survey = Survey::find($token["survey_id"]);
        return Inertia::render("Survey/Answer", compact('survey', "user"));
    }
}
