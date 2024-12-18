<?php

namespace App\Http\Controllers;

use App\Enums\ColorEnum;
use App\Events\ActivityScheduleUpdate;
use App\Http\Requests\ActivityRequest;
use App\Http\Resources\ActivityListResource;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\SiteResource;
use App\Library\DownloadFile;
use App\Models\Activity;
use App\Models\Sites;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $activities = Activity::withTrashed()
            ->editables()
            ->search($request->input("search"))
            ->orderBy("updated_at", "DESC")
            ->paginate($request->per_page ?? 10);

        $activities = ActivityListResource::collection($activities);
        return Inertia::render("Activity/List", compact('activities'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize("create", Activity::class);
        $sites = SiteResource::collection(Sites::all())->toArray(request());
        $colors = ColorEnum::casesValue();

        return Inertia::render("Activity/Create", compact('sites', 'colors'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ActivityRequest $request)
    {
        Gate::authorize("create", arguments: Activity::class);

        $validated = [
            ...$request->validated(),
            "image" => $request->image,
            "created_by" => Auth::id(),
        ];

        $activity = new Activity($validated);

        DB::beginTransaction();

        try {
            $activity->save();
            $activity->schedulers()->createMany($validated["schedulers"]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return redirect()->route("activities.edit", $activity);
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
        Gate::authorize("update", $activity);

        $activity->load(["schedulers", "owner", "surveys"]);
        $activity = (new ActivityResource($activity))->toArray(request());

        $sites = SiteResource::collection(Sites::all())->toArray(request());
        $colors = ColorEnum::casesValue();

        return Inertia::render("Activity/Create", compact('activity', 'sites', 'colors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ActivityRequest $request, Activity $activity)
    {
        Gate::authorize("update", $activity);

        $publish = $request->action == "publish";
        if ($publish || $activity->isPublished) {
            $request->validate([
                "schedulers" => ["required", "min:1"]
            ]);
        }

        $validated = [
            ...$request->validated(),
            "image" => $request->image,
        ];

        DB::beginTransaction();
        try {
            $activity->update($validated);

            $activity->schedulers()->delete();
            $activity->schedulers()->createMany($validated["schedulers"]);
            ActivityScheduleUpdate::dispatch($activity);

            if ($publish) $activity->publish();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        if ($publish) return redirect()->route("activities.index");
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        Gate::authorize("delete", $activity);
        $activity->delete();

        return redirect()->route("activities.index");
    }

    public function download(Activity $activity)
    {
        Gate::authorize("downloadReport", $activity);

        $headers = [
            "pivot.registered_at" => "Fecha de registro",
            "name" => "Nombres",
            "last_name" => "Apellidos",
            "email" => "Correo",
            "phone" => "Teléfono",
        ];

        $users = $activity->enrollments->toArray();

        $document = (new DownloadFile())
            ->setFilename("reporte-asistencia-{$activity->name}")
            ->addHeaders($headers)
            ->addBodyRows($users);

        return response()->download($document->buildExcel())->deleteFileAfterSend(true);
    }
}
