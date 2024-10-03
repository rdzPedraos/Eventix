<?php

namespace App\Rules\Fields;

use App\Models\Question;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UniqueSelectRule implements ValidationRule
{
    public function __construct(
        protected Question $question
    ) {
        //
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $question = $this->question;

        if ($question->is_required && empty($value)) {
            $fail("El campo es requerido");
        }

        if (!in_array($value, $question->options)) {
            $fail("El campo tiene valores no permitidos");
        }
    }
}
