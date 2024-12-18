<?php

namespace App\Rules\Fields;

use App\Models\Question;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DateRule implements ValidationRule
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

        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) {
            $fail("El campo debe tener el formato YYYY-MM-DD");
        }

        #Validar que el año tenga sentido 0001 no seria vlaido, al igual que dia 32
        $date = Carbon::parse($value);

        if (!$date->gt(now()->addYears(-100))) {
            $fail("La fecha no puede ser inferior a 100 años.");
        }
    }
}
