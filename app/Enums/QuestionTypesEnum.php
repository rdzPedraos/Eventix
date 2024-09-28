<?php

namespace App\Enums;

enum QuestionTypesEnum: string
{
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
