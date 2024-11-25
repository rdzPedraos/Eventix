<?php

namespace App\Enums;

use App\Traits\EnumHelpers;

enum ColorEnum: string
{
    use EnumHelpers;

    case YELLOW = "#FBBA13";
    case ORANGE = "#FF6500";
    case PINK = "#E60E8A";
    case PURPLE = "#9500C9";
    case SKY = "#42ACD4";
    case SEA_WATER = "#24A88E";
    case GREEN = "#80BD41";
}
