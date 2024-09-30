<?php

namespace App\Enums;

use App\Traits\EnumHelpers;

enum QuestionTypesEnum: string
{
    use EnumHelpers;

    case TEXT = "text";
    case NUMBER = "number";
    case RADIO = "radio";
    case CHECKBOX = "checkbox";
    case DATE = "date";
    case SELECT = "select";

    public function label(): string
    {
        return __("survey.question-type.{$this->value}");
    }
}
