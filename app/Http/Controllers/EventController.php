<?php

namespace App\Http\Controllers;

use App\Http\Resources\SchedulerResource;
use App\Library\DownloadCSV;
use App\Models\Activity;
use App\Models\Scheduler;
use App\Models\Sites;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'day' => ["required", 'date'],
            'mode' => ["required", 'in:week,day'],
            "activity_name" => ["nullable", "string"],
            "site" => ["nullable", "exists:sites,id"],
            "except" => ["nullable", "exists:activities,id"]
        ]);

        $mode = $filters['mode'];
        $date = Carbon::parse(time: $filters['day']);

        $schedulers = Scheduler::with(["activity", "activity.enrollments"])
            ->search(
                $request->input("activity_name"),
                $request->input("site"),
                $request->input("except")
            );

        switch ($mode) {
            case "week":
                $startOfWeek = $date->copy()->startOfWeek(0);
                $endOfWeek = $startOfWeek->copy()->addDays(7);

                $schedulers->whereBetween('start_date', [$startOfWeek, $endOfWeek]);
                break;

            case "day":
                $schedulers->whereDate('start_date', $date);
                break;

            default:
                return response()->json(['message' => 'Invalid mode'], 400);
        }

        $schedulers = SchedulerResource::collection($schedulers->get());
        return response()->json($schedulers);
    }

    public function subscribe(Request $request, Activity $activity)
    {
        $user = $request->user();
        $activity->enrollments()->attach($user);

        return redirect()->back();
    }

    public function unsubscribe(Request $request, Activity $activity)
    {
        $user = $request->user();
        $activity->enrollments()->detach($user);

        return redirect()->back();
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

        $document = (new DownloadCSV())
            ->setFilename("reporte-asistencia-{$activity->name}")
            ->addHeaders($headers)
            ->addBodyRows($users);

        return response()->download($document->build())->deleteFileAfterSend(true);
    }

    public function getSites()
    {
        $sites = Sites::all();

        return response()->json($sites);
    }
}
