<?php

namespace App\Http\Resources;

use App\Enums\ActivityStatusEnum;
use App\Enums\RoleEnum;
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
        $user = auth()->user();
        $isClosed = $this->status == ActivityStatusEnum::CANCELED;

        $editable = false;
        if (!$isClosed) {

            $editable = $user->hasRole(RoleEnum::SUPER_ADMIN) || $this->status != ActivityStatusEnum::PUBLISHED || $this->owner->id == $user->id;
        }

        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "status" => [
                "color" => $this->status->color(),
                "label" => $this->status->label(),
                "isClosed" => $isClosed,
            ],
            "color" => $this->color,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "created_by" => $this->owner->name,
            "editable" => $editable,
        ];
    }
}
