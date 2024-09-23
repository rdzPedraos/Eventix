<?php

namespace App\Http\Controllers;

use App\Http\Resources\SchedulerResource;
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
        ]);

        $mode = $request->input('mode');
        $date = Carbon::parse(time: $request->input('date'));

        $schedulers = Scheduler::whereHas('activity', function ($query) {
            $query->published();
        });

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
}
