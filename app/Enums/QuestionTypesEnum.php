<?php

namespace App\Enums;

enum QuestionTypesEnum: string
{
    case TEXT = "text";
    case NUMBER = "number";
    case RADIO = "radio";
    case CHECKBOX = "checkbox";
    case DATE = "date";

    public function label(): string
    {
        return __("survey.trigger.{$this->value}");
    }
}
