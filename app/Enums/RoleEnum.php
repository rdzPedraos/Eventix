<?php

namespace App\Enums;

enum RoleEnum: string
{
    case SUPER_ADMIN = 'super-admin';
    case ADMIN = 'admin';
    case BIENESTAR = 'bienestar';


    public function label(): string
    {
        return __("permissions.roles.{$this->value}");
    }
}
