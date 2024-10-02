<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Survey>
 */
class InscriptionFactory extends Factory
{
    protected $activity_id = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $activity = Activity::find($this->activity_id);
        //solo los que no estan inscritos!
        $user = User::whereDoesntHave("enrolledActivities", function ($query) use ($activity) {
            $query->where("activity_id", $activity->id);
        })->inRandomOrder()->first();

        return [
            "activity_id" => $activity->id,
            "user_id" => $user->id,
        ];
    }

    function withActivity($activity_id): InscriptionFactory
    {
        $this->activity_id = $activity_id;
        return $this;
    }
}
