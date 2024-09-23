<?php

namespace App\Http\Resources;

use App\Enums\ActivityStatusEnum;
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
        $base64 = null;
        if ($this->image) {
            $imgSrc = Storage::disk("public")->path($this->image);
            $type = pathinfo($imgSrc, PATHINFO_EXTENSION);
            $data = file_get_contents($imgSrc);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        }

        $schedulers = collect($this->schedulers)->sortBy("start_date")->values();

        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            #"status" => $this->status->label(),
            "isPublished" => $this->isPublished(),
            "color" => $this->color,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "created_by" => $this->owner->name,
            "image" => $base64,
            "schedulers" => SchedulerResource::collection($schedulers)->toArray($request),
        ];
    }
}
