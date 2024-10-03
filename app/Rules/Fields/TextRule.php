<?php

namespace App\Rules\Fields;

use App\Models\Question;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TextRule implements ValidationRule
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

        if (!preg_match('/^[a-zA-ZñáéíóúÁÉÍÓÚ0-9\s\.\-]+$/', $value)) {
            $fail("El campo solo puede contener letras, números, espacios, puntos y guiones");
        }
    }
}
