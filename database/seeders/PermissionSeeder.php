<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    const ROLES = [
        RoleEnum::ADMIN->value => [
            PermissionEnum::ACTIVITY_CHECK,
            PermissionEnum::ACTIVITY_CREATE,
            PermissionEnum::ACTIVITY_ADD_EDITOR,
            PermissionEnum::ACTIVITY_EDIT,
            PermissionEnum::ACTIVITY_REMOVE,
            PermissionEnum::ACTIVITY_PUBLISH,
            PermissionEnum::SURVEY_CHECK,
            PermissionEnum::SURVEY_CREATE,
            PermissionEnum::SURVEY_EDIT,
            PermissionEnum::SURVEY_REMOVE,
            PermissionEnum::SURVEY_PUBLISH,
            PermissionEnum::ATTENDANCE_CHECK,
            PermissionEnum::ATTENDANCE_REPORT,
        ],

        RoleEnum::BIENESTAR->value => [
            PermissionEnum::ACTIVITY_CHECK,
            PermissionEnum::ACTIVITY_CREATE,
            PermissionEnum::ACTIVITY_ADD_EDITOR,
            PermissionEnum::ACTIVITY_EDIT,
            PermissionEnum::ACTIVITY_REMOVE,
            PermissionEnum::ACTIVITY_PUBLISH,
            PermissionEnum::SURVEY_CHECK,
            PermissionEnum::SURVEY_CREATE,
            PermissionEnum::SURVEY_EDIT,
            PermissionEnum::SURVEY_REMOVE,
            PermissionEnum::SURVEY_PUBLISH,
            PermissionEnum::ATTENDANCE_CHECK,
            PermissionEnum::ATTENDANCE_REPORT,
            PermissionEnum::PLACES_EDIT,
            PermissionEnum::PLACES_DELETE,
            PermissionEnum::ACADEMIC_ROLES_CHECK,
            PermissionEnum::ACADEMIC_ROLES_LIST_REQUEST,
            PermissionEnum::ACADEMIC_ROLES_APPROVE,
        ],

        RoleEnum::SUPER_ADMIN->value => [],
    ];

    /**
     * Seed the application's database.¡
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (PermissionEnum::cases() as $permission) {
            Permission::firstOrCreate([
                'name' => $permission->value
            ]);
        }


        foreach (self::ROLES as $name => $permissions) {
            $role = Role::firstOrCreate([
                'name' => $name
            ]);

            $role->syncPermissions($permissions);
        }
    }
}
