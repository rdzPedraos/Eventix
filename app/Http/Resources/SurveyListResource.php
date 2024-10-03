<?php

namespace App\Http\Resources;

use App\Enums\SurveyTriggerEnum;
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
            "status" => self::getStatus(),
            "is_closed" => $this->deleted_at !== null,
            "description" => $this->description,
            "trigger" => self::getTypeTrigger(),
            "answers_count" => $this->answers->count(),
            "activity" => [
                "id" => $this->activity->id,
                "name" => $this->activity->name
            ]
        ];
    }

    protected function getTypeTrigger()
    {
        $trigger = $this->published_trigger;
        return [
            "label" => $trigger->label(),
            "date" => $this->trigger_date?->format("Y/m/d"),
        ];
    }

    protected function getStatus()
    {
        if ($this->deleted_at !== null) {
            return [
                "color" => "danger",
                "label" => "Cerrado",
            ];
        }

        if ($this->isPublished) {
            return [
                "color" => "primary",
                "label" => "Publicado",
            ];
        }

        if ($this->blocked) {
            return [
                "color" => "warning",
                "label" => "Por publicar",
            ];
        }

        return [
            "color" => "default",
            "label" => "Borrador",
        ];
    }
}
