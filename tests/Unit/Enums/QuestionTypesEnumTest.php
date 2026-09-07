<?php

namespace Tests\Unit\Enums;

use App\Enums\QuestionTypesEnum;
use Tests\TestCase;

class QuestionTypesEnumTest extends TestCase
{
    public function test_cases_name_returns_enum_names(): void
    {
        $this->assertSame(
            ["TEXT", "NUMBER", "DATE", "RADIO", "CHECKBOX", "SELECT"],
            QuestionTypesEnum::casesName()
        );
    }

    public function test_cases_value_returns_all_backing_values(): void
    {
        $this->assertSame(
            ["text", "number", "date", "radio", "checkbox", "select"],
            QuestionTypesEnum::casesValue()
        );
    }

    public function test_label_returns_translated_name(): void
    {
        $this->assertSame("Texto", QuestionTypesEnum::TEXT->label());
        $this->assertSame("Selección múltiple", QuestionTypesEnum::CHECKBOX->label());
    }

    public function test_cases_key_label_maps_value_and_label(): void
    {
        $items = QuestionTypesEnum::casesKeyLabel();

        $this->assertSame(
            ["key" => "text", "value" => "Texto"],
            $items[0]
        );
        $this->assertSame(
            ["key" => "select", "value" => "Selección"],
            $items[5]
        );
    }
}
