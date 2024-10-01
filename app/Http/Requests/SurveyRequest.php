<?php

namespace App\Http\Requests;

use App\Enums\QuestionTypesEnum;
use App\Enums\SurveyTriggerEnum;
use Illuminate\Foundation\Http\FormRequest;

class SurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $triggers = implode(",", SurveyTriggerEnum::casesValue());
        $customTrigger = SurveyTriggerEnum::CUSTOM->value;

        $inputTypes = implode(",", QuestionTypesEnum::casesValue());
        $inputWithOptions = implode(",", [QuestionTypesEnum::SELECT->value, QuestionTypesEnum::RADIO->value, QuestionTypesEnum::CHECKBOX->value]);

        return [
            "name" => ["required", "string"],
            "description" => ["required", "string"],
            "published_trigger" => ["required", "string", "in:{$triggers}"],
            "trigger_date" => ["required_if:published_trigger,{$customTrigger}", "date"],
            "questions" => ["required", "array"],
            "questions.*.label" => ["required", "string"],
            "questions.*.type" => ["required", "string", "in:{$inputTypes}"],
            "questions.*.options" => ["required_if:questions.*.type,{$inputWithOptions}", "nullable", "array"],
            "questions.*.options.*" => ["required", "string"],
            "questions.*.is_required" => ["required", "boolean"],
            "publish" => ["nullable", "boolean"],
        ];
    }
}
