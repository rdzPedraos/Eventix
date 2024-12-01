<?php

namespace App\Http\Requests;

use App\Enums\QuestionTypesEnum;
use App\Enums\SurveyTriggerEnum;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

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

        $rules = [
            "name" => ["required", "string"],
            "description" => ["required", "string"],
            "published_trigger" => ["required", "string", "in:{$triggers}"],
            "trigger_date" => ["required_if:published_trigger,{$customTrigger}", "nullable", "date"],
            "questions" => ["required", "array"],
            "questions.*.label" => ["required", "string"],
            "questions.*.type" => ["required", "string", "in:{$inputTypes}"],
            "questions.*.options" => ["required_if:questions.*.type,{$inputWithOptions}", "nullable", "array"],
            "questions.*.options.*" => ["required", "string"],
            "questions.*.is_required" => ["required", "boolean"],
            "publish" => ["nullable", "boolean"],
        ];

        if ($this->route()->getName() == "surveys.store") {
            $rules["activity_id"] = ["required", "exists:activities,id"];
        }

        return $rules;
    }

    public function attributes(): array
    {
        return [
            "questions.*.label" => "texto de la pregunta",
            "questions.*.type" => "tipo de pregunta",
            "questions.*.options" => "opciones de la pregunta",
        ];
    }

    public function messages(): array
    {
        return [
            "questions.*.options.*.required" => "Las opciones de las preguntas son requeridas",
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->getMessages();
        $groupedErrors = [];

        foreach ($errors as $key => $messages) {
            $parts = explode('.', $key);

            if (!isset($parts[1])) {
                $groupedErrors[$key] = $messages;
                continue;
            }

            $name = $parts[0];
            $index = $parts[1];
            $groupedErrors["{$name}.{$index}"][] = implode(', ', $messages);
        }

        throw ValidationException::withMessages($groupedErrors);
    }
}
