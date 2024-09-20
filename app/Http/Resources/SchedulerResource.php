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
        //$this->day is a Carbon instance add startDate and endDate
        $startDate = Carbon::parse($this->day)->format("Y-m-d $this->start");
        $endDate = Carbon::parse($this->day)->format("Y-m-d $this->end");

        return [
            'id' => $this->id,
            "activity" => [
                "name" => $this->activity->name,
                "description" => $this->activity->description,
                "color" => $this->activity->color,
            ],
            'day' => $this->day,
            "start_date" => $startDate,
            "end_date" => $endDate,
        ];
    }
}
