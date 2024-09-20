<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ActivityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $imgSrc = $this->image ? Storage::disk("public")->url($this->image) : null;

        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "status" => $this->status->label(),
            "color" => $this->color,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "created_by" => $this->owner->name,
            "image" => $imgSrc,
            "schedulers" => $this->schedulers,
        ];
    }
}
