<?php

namespace App\Http\Controllers;

use App\Http\Resources\SchedulerResource;
use App\Library\DownloadCSV;
use App\Models\Activity;
use App\Models\Scheduler;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'date' => 'date',
            'mode' => 'string|in:week,day',
            "except" => "nullable|exists:activities,id"
        ]);

        $mode = $request->input('mode');
        $date = Carbon::parse(time: $request->input('date'));

        $schedulers = Scheduler::whereHas('activity', function ($query) use ($request) {
            $query->published();

            if ($request->has('except')) {
                $query->where('id', '!=', $request->input('except'));
            }
        })->with("activity.enrollments");


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
}
