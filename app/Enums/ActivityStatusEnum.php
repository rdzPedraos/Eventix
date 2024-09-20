<?php

namespace App\Enums;

use App\Traits\EnumHelpers;

enum ActivityStatusEnum: string
{
    use EnumHelpers;

    case EDITING = "editing";
    case PUBLISHED = "published";
    case CANCELED = "canceled";

    public function label(): string
    {
        return __("activity.status.{$this->value}");
    }

    public function color(): string
    {
        return match ($this) {
            self::EDITING => "secondary",
            self::PUBLISHED => "success",
            self::CANCELED => "danger",
        };
    }
}
