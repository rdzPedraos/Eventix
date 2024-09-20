<?php

namespace App\Http\Resources;

use App\Enums\ActivityStatusEnum;
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
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "status" => [
                "color" => $this->status->color(),
                "label" => $this->status->label(),
                "isClosed" => $this->status == ActivityStatusEnum::CANCELED,
            ],
            "color" => $this->color,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "created_by" => $this->owner->name,
        ];
    }
}
