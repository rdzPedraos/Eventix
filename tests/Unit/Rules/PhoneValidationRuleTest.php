<?php

namespace Tests\Unit\Rules;

use App\Rules\PhoneValidationRule;
use Tests\Concerns\ValidatesAttributes;
use Tests\TestCase;

class PhoneValidationRuleTest extends TestCase
{
    use ValidatesAttributes;

    public function test_accepts_valid_colombian_mobile_number(): void
    {
        $rule = new PhoneValidationRule;

        $this->assertValidationPasses($rule, "3001234567");
    }

    public function test_rejects_number_not_starting_with_three(): void
    {
        $rule = new PhoneValidationRule;

        $this->assertValidationFails($rule, "2001234567");
    }

    public function test_rejects_number_with_wrong_length(): void
    {
        $rule = new PhoneValidationRule;

        $this->assertValidationFails($rule, "300123456");
    }
}
