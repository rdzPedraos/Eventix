<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SchedulerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            "activity" => [
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
