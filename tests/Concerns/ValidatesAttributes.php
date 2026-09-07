<?php

namespace Tests\Concerns;

use Illuminate\Contracts\Validation\ValidationRule;

trait ValidatesAttributes
{
    protected function assertValidationPasses(ValidationRule $rule, mixed $value, string $attribute = "field"): void
    {
        $failed = null;

        $rule->validate($attribute, $value, function (string $message) use (&$failed) {
            $failed = $message;
        });

        $this->assertNull($failed, $failed ?? "Validation should pass.");
    }

    protected function assertValidationFails(ValidationRule $rule, mixed $value, string $attribute = "field"): string
    {
        $failed = null;

        $rule->validate($attribute, $value, function (string $message) use (&$failed) {
            $failed = $message;
        });

        $this->assertNotNull($failed, "Validation should fail.");

        return $failed;
    }
}
