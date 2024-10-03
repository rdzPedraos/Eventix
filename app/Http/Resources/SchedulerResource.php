<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class SchedulerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $already_enrolled = Auth::id() ? $this->activity->enrollments->contains("id", Auth::id()) : false;

        return [
            'id' => $this->id,
            "already_enrolled" => $already_enrolled,
            "activity" => [
                "id" => $this->activity->id,
                "name" => $this->activity->name,
                "description" => $this->activity->description,
                "color" => $this->activity->color,
            ],
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            "site_id" => $this->site_id,
        ];
    }
}
