<?php

namespace App\Enums;

use App\Traits\EnumHelpers;

enum RoleEnum: string
{
    use EnumHelpers;

    case SUPER_ADMIN = 'super-admin';
    case ADMIN = 'admin';
    case BIENESTAR = 'bienestar';


    public function label(): string
    {
        return __("permissions.roles.{$this->value}");
    }
}
