<?php

namespace App\Traits;

use App\Enums\RoleEnum;
use Spatie\Permission\Models\Permission;

trait SuperAdminPermissions
{
    public function getAllPermissions()
    {
        if ($this->hasRole(RoleEnum::SUPER_ADMIN)) {
            return Permission::all();
        }

        return $this->permissions->merge($this->getPermissionsViaRoles())->sort()->values();
    }
}
