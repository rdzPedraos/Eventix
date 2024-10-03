<?php

namespace App\Rules\Fields;

use App\Models\Question;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MultipleSelectRule implements ValidationRule
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
        $values = explode("|", $value);
        $question = $this->question;

        if ($question->is_required && empty($values)) {
            $fail("El campo es requerido");
        }

        foreach ($values as $val) {
            if (!in_array($val, $question->options)) {
                $fail("El campo tiene valores no permitidos");
            }
        }
    }
}
