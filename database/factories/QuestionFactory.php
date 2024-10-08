<?php

namespace Database\Factories;

use App\Enums\QuestionTypesEnum;
use App\Models\Survey;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $survey = Survey::inRandomOrder()->first();
        $type = $this->faker->randomElement(QuestionTypesEnum::cases());
        $options = in_array($type, [QuestionTypesEnum::RADIO, QuestionTypesEnum::CHECKBOX, QuestionTypesEnum::SELECT]) ? [
            $this->faker->word(),
            $this->faker->word(),
            $this->faker->word(),
        ] : null;

        return [
            "survey_id" => $survey->id,
            "label" => $this->faker->sentence(4),
            "type" => $type,
            "is_required" => $this->faker->boolean(),
            "options" => $options,
        ];
    }
}
