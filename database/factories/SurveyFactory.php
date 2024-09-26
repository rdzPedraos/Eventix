<?php

namespace Database\Factories;

use App\Enums\QuestionTypesEnum;
use App\Enums\SurveyTriggerEnum;
use App\Models\Activity;
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
        $activity_id = Activity::inRandomOrder()->first()->id;
        $published_trigger = $this->faker->randomElement(SurveyTriggerEnum::cases());

        return [
            "activity_id" => $activity_id,
            "name" => $this->faker->name(),
            "description" => $this->faker->text(),
            "published_trigger" => $published_trigger,
            "trigger_date" => $published_trigger === SurveyTriggerEnum::CUSTOM ? $this->faker->date() : null,
            "questions" => $this->createQuestions(),
        ];
    }

    private function createQuestions()
    {
        $number = $this->faker->numberBetween(1, 5);
        $questions = [];

        for ($i = 0; $i < $number; $i++) {
            $type = $this->faker->randomElement(QuestionTypesEnum::cases());

            $questions[] = [
                "question" => $this->faker->sentence(),
                "is_required" => $this->faker->boolean(),
                "type" => $type,
                "options" => $type === QuestionTypesEnum::RADIO || $type === QuestionTypesEnum::CHECKBOX ? [
                    $this->faker->word(),
                    $this->faker->word(),
                    $this->faker->word(),
                ] : null,
            ];
        }

        return $questions;
    }
}
