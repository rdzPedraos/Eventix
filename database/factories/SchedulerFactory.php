<?php

namespace Database\Factories;

use App\Models\Activity;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class SchedulerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $activity = Activity::inRandomOrder()->first();
        $lastScheduler = $activity->schedulers()->orderBy("day")->orderBy("start")->first();
        $startDay = $lastScheduler->day ?? Carbon::now()->startOfWeek()->subDay();

        $day = fake()->dateTimeBetween($startDay->format('Y-m-d'), $startDay->addDays(7)->format('Y-m-d'))->format('Y-m-d');
        $start = fake()->dateTimeBetween($day, "{$day}23:00:00");
        $end = fake()->dateTimeBetween($start, "{$day}23:30:00");

        return [
            'activity_id' => $activity->id,
            'day' => $day,
            'start' => $start,
            'end' => $end,
        ];
    }
}
