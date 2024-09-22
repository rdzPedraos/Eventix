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
        $date = Carbon::parse(time: $request->input('date'),);

        if ($mode === 'week') {
            $startOfWeek = $date->copy()->startOfWeek(0);
            $endOfWeek = $startOfWeek->copy()->addDays(7);

            $schedulers = Scheduler::whereBetween('start_date', [$startOfWeek, $endOfWeek]);
        } elseif ($mode === 'dia') {
            $schedulers = Scheduler::whereDate('start_date', $date);
        } else {
            return response()->json(['error' => 'Tipo no válido'], 400);
        }

        $schedulers = SchedulerResource::collection($schedulers->with("activity")->get());
        return response()->json($schedulers);
    }
}
