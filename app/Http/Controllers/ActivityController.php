<?php

namespace App\Http\Controllers;

use App\Enums\ActivityStatusEnum;
use App\Enums\PermissionEnum;
use App\Http\Requests\ActivityRequest;
use App\Http\Resources\ActivityListResource;
use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $activities = ActivityListResource::collection($activities);

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
        $validated = [
            ...$request->validated(),
            "image" => $request->image,
            "created_by" => Auth::id(),
        ];

        $activity = new Activity($validated);
        if ($request->action == "publish") {
            $activity->status = ActivityStatusEnum::PUBLISHED;
        }

        DB::beginTransaction();
        try {
            $activity->save();
            $activity->schedulers()->createMany($validated["schedulers"]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

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
        $activity = (new ActivityResource($activity))->toArray(request());
        return Inertia::render("Activity/Create", compact('activity'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ActivityRequest $request, Activity $activity)
    {
        $validated = [
            ...$request->validated(),
            "image" => $request->image,
        ];


        DB::beginTransaction();
        try {
            if ($request->action == "publish") {
                $activity->status = ActivityStatusEnum::PUBLISHED;
            }
            $activity->update($validated);
            $activity->schedulers()->delete();
            $activity->schedulers()->createMany($validated["schedulers"]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        //
    }
}
