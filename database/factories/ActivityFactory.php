<?php

namespace Database\Factories;

use App\Enums\ActivityStatusEnum;
use App\Enums\PermissionEnum;
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
        //get random user with permission to create activities
        $created_by = User::permission(PermissionEnum::ACTIVITY_CREATE)->inRandomOrder()->first()->id;

        $path = Storage::disk("public")->path("");
        $image_path = fake()->image($path);
        $image_path = str_replace($path, "", $image_path);

        return [
            "name" => fake()->text(25),
            "description" => fake()->text(255),
            "image" => $image_path,
            "status" => fake()->randomElement(ActivityStatusEnum::cases()),
            "color" => fake()->randomElement([
                "#daeafe",
                "#dcfce7",
                "#f3e8ff",
                "#fee2e2",
                "#fef9c3",
            ]),
            "created_by" => $created_by,
        ];
    }
}
