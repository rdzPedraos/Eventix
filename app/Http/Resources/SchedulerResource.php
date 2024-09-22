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
        #$startDate = Carbon::parse($this->day)->format("Y-m-d $this->start");
        #$endDate = Carbon::parse($this->day)->format("Y-m-d $this->end");
        $start_date = Carbon::parse($this->start_date)->format("Y-m-d\TH:i:s.00");
        $end_date = Carbon::parse($this->end_date)->format("Y-m-d\TH:i:s.00");

        return [
            'id' => $this->id,
            "activity" => [
                "name" => $this->activity->name,
                "description" => $this->activity->description,
                "color" => $this->activity->color,
            ],
            "start_date" => $start_date,
            "end_date" => $end_date,
        ];
    }
}
