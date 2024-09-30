<?php

namespace App\Traits;

trait EnumHelpers
{
    public static function casesName()
    {
        $cases = self::cases();
        return array_map(fn($c) => $c->name, $cases);
    }

    public static function casesValue()
    {
        $cases = self::cases();
        return array_map(fn($c): mixed => $c->value, $cases);
    }

    public static function casesKeyLabel()
    {
        $cases = self::cases();
        return array_map(fn($c) => ["key" => $c->value, "value" => $c->label()], $cases);
    }
}
