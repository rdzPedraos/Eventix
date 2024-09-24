<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\Sites;
use Carbon\Carbon;
use Carbon\WeekDay;
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
        $lastScheduler = $activity->schedulers()->orderBy("start_date")->first();
        $lastDay = $lastScheduler->start_date ?? Carbon::now()->startOfWeek(WeekDay::Sunday);

        $startDate = Carbon::parse($lastDay)->addDays(rand(0, 6))->addMinutes(15 * rand(0, 4 * 23));
        $endDate = fake()->dateTimeBetween($startDate, $startDate->copy()->endOfDay()->subMinutes(15));

        $site = Sites::inRandomOrder()->first();

        return [
            'activity_id' => $activity->id,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'site_id' => $site->id,
        ];
    }
}
