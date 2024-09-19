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
}
