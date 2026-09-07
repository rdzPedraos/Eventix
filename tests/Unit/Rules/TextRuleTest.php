<?php

namespace Tests\Unit\Rules;

use App\Models\Question;
use App\Rules\Fields\TextRule;
use Tests\Concerns\ValidatesAttributes;
use Tests\TestCase;

class TextRuleTest extends TestCase
{
    use ValidatesAttributes;

    private function makeQuestion(bool $isRequired): Question
    {
        return new Question(["is_required" => $isRequired]);
    }

    public function test_fails_when_required_field_is_empty(): void
    {
        $rule = new TextRule($this->makeQuestion(true));

        $message = $this->assertValidationFails($rule, "");

        $this->assertSame("El campo es requerido", $message);
    }

    public function test_optional_empty_field_passes_validation(): void
    {
        $rule = new TextRule($this->makeQuestion(false));

        $this->assertValidationPasses($rule, "");
    }

    public function test_accepts_valid_text(): void
    {
        $rule = new TextRule($this->makeQuestion(true));

        $this->assertValidationPasses($rule, "Hola mundo 123");
    }

    public function test_rejects_invalid_characters(): void
    {
        $rule = new TextRule($this->makeQuestion(false));

        $this->assertValidationFails($rule, "texto@invalido");
    }
}
