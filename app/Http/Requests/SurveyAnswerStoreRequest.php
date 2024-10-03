<?php

namespace App\Http\Requests;

use App\Enums\QuestionTypesEnum;
use App\Models\Question;
use App\Models\Survey;
use App\Rules\Fields\DateRule;
use App\Rules\Fields\MultipleSelectRule;
use App\Rules\Fields\NumberRule;
use App\Rules\Fields\TextRule;
use App\Rules\Fields\UniqueSelectRule;
use Illuminate\Foundation\Http\FormRequest;

class SurveyAnswerStoreRequest extends SurveyAnswerRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return parent::authorize();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $survey = Survey::findOrFail($this->survey_id);
        $rulesMap = parent::rules();

        foreach ($survey->questions as $question) {
            $rulesMap[$question->id] = self::getRules($question);
        }

        return $rulesMap;
    }

    public function prepareForValidation()
    {
        parent::prepareForValidation();
    }

    public function messages()
    {
        return [
            "required" => "El campo es requerido",
            "string" => "El campo debe ser una cadena de texto",
            "numeric" => "El campo debe ser un número",
            "date" => "El campo debe ser una fecha",
            "in" => "El campo no es válido",
            "regex" => "El campo no tiene un formato válido",
        ];
    }

    protected static function getRules(Question $question)
    {
        switch ($question->type) {
            case QuestionTypesEnum::TEXT:
                return new TextRule($question);

            case QuestionTypesEnum::NUMBER:
                return new NumberRule($question);

            case QuestionTypesEnum::DATE:
                return new DateRule($question);

            case QuestionTypesEnum::RADIO:
                return new UniqueSelectRule($question);

            case QuestionTypesEnum::CHECKBOX:
            case QuestionTypesEnum::SELECT:
                return new MultipleSelectRule($question);
        }
    }
}
