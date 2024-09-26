<?php

namespace App\Enums;

enum SurveyTriggerEnum: string
{

    case CUSTOM = "custom";
    case TO_START = "to_start";
    case TO_END = "to_end";

    public function label(): string
    {
        return __("survey.trigger.{$this->value}");
    }
}
