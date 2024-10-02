<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "published_trigger" => $this->published_trigger,
            "trigger_date" => $this->trigger_date,
            "activity" => [
                "id" => $this->activity->id,
                "name" => $this->activity->name
            ]
        ];
    }
}
