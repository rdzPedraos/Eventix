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
            "description" => $this->description,
            "trigger" => [
                "label" => $this->published_trigger->label(),
                "date" => $this->trigger_date?->format("d/m/Y"),
            ],
            "published_at" => $this->published_at?->format("d/m/Y"),
            "answers_count" => $this->answers->count(),
            "activity" => [
                "id" => $this->activity->id,
                "name" => $this->activity->name
            ]
        ];
    }

    protected function getStatus()
    {
        if ($this->deleted_at !== null) {
            return [
                "color" => "danger",
                "label" => "Cerrado",
                "key" => "closed"
            ];
        }

        if ($this->isPublished) {
            return [
                "color" => "primary",
                "label" => "Publicado",
                "key" => "published"
            ];
        }

        if ($this->blocked) {
            return [
                "color" => "warning",
                "label" => "Por publicar",
                "key" => "blocked"
            ];
        }

        return [
            "color" => "default",
            "label" => "Borrador",
            "key" => "draft"
        ];
    }
}
