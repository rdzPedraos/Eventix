<?php

namespace Database\Factories;

use App\Enums\ActivityStatusEnum;
use App\Enums\PermissionEnum;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

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
        return [
            'activity_id' => Activity::inRandomOrder()->first()->id,
            'day' => fake()->date(),
            'start' => fake()->time(),
            'end' => fake()->time(),
        ];
    }
}
