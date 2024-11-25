<?php

namespace App\Traits;

trait EnumHelpers
{
    public static function casesName()
    {
        return array_column(self::cases(), 'name');
    }

    public static function casesValue()
    {
        return array_column(self::cases(), 'value');
    }

    public static function casesKeyLabel()
    {
        $cases = self::cases();
        return array_map(fn($c) => ["key" => $c->value, "value" => $c->label()], $cases);
    }
}
