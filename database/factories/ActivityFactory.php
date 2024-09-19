<?php

namespace Database\Factories;

use App\Enums\ActivityStatusEnum;
use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->text(25),
            "description" => fake()->text(255),
            "image" => fake()->image(Storage::disk("activities")->path("")),
            "status" => fake()->randomElement(ActivityStatusEnum::cases()),
            "color" => fake()->hexColor(),
            "created_by" => User::inRandomOrder()->first(),
        ];
    }
}
