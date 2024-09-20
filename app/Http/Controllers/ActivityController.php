<?php

namespace App\Http\Controllers;

use App\Enums\ActivityStatusEnum;
use App\Enums\PermissionEnum;
use App\Http\Requests\ActivityRequest;
use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ActivityController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware("permission:" . PermissionEnum::ACTIVITY_CHECK->value, ["index"]),
            new Middleware("permission:" . PermissionEnum::ACTIVITY_CREATE->value, ["create", "store"]),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $activities = $user->accesibleActivities()->orderBy("updated_at", "DESC")->paginate($request->per_page ?? 10);
        $activities = ActivityResource::collection($activities);

        return Inertia::render("Activity/List", compact('activities'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Activity/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ActivityRequest $request)
    {
        $activity = new Activity($request->validated());
        $activity->created_by = Auth::id();

        if ($request->action == "save") {
            $activity->status = ActivityStatusEnum::EDITING;
        } else {
            $activity->status = ActivityStatusEnum::PUBLISHED;
        }

        $activity->save();

        return redirect()->route("activities.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activity $activity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Activity $activity)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        //
    }
}
