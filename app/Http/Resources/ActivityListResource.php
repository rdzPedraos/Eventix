<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $isClosed = $this->deleted_at !== null;

        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "status" => self::getStatus(),
            "is_closed" => $isClosed,
            "color" => $this->color,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "created_by" => $this->owner->name,
            "enrollments" => $this->enrollments->count(),
        ];
    }

    public function getStatus()
    {
        if ($this->deleted_at !== null) {
            return [
                "color" => "danger",
                "label" => "Cerrado",
            ];
        }

        if ($this->isPublished) {
            return [
                "color" => "success",
                "label" => "Publicado",
            ];
        }

        return [
            "color" => "default",
            "label" => "Borrador",
        ];
    }
}
