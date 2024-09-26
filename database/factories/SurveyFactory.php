<?php

namespace Database\Factories;

use App\Enums\SurveyTriggerEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Survey>
 */
class SurveyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $published_trigger = $this->faker->randomElement(SurveyTriggerEnum::cases());

        return [
            "name" => $this->faker->name(),
            "description" => $this->faker->text(),
            "published_trigger" => $published_trigger,
            "trigger_date" => $published_trigger === SurveyTriggerEnum::CUSTOM ? $this->faker->date() : null,
        ];
    }
}
