<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    const ROLES = [
        Role::ADMIN => [
            PermissionEnum::ACTIVITY_CHECK,
            PermissionEnum::ACTIVITY_CREATE,
            PermissionEnum::ACTIVITY_EDIT,
            PermissionEnum::ACTIVITY_REMOVE,
            PermissionEnum::ACTIVITY_PUBLISH,
            PermissionEnum::SURVEY_CHECK,
            PermissionEnum::SURVEY_CREATE,
            PermissionEnum::SURVEY_EDIT,
            PermissionEnum::SURVEY_REMOVE,
            PermissionEnum::SURVEY_PUBLISH,
            PermissionEnum::ATTENDANCE_REPORT,
        ],

        Role::BIENESTAR => [
            PermissionEnum::ACTIVITY_CHECK,
            PermissionEnum::ACTIVITY_CREATE,
            PermissionEnum::ACTIVITY_EDIT,
            PermissionEnum::ACTIVITY_REMOVE,
            PermissionEnum::ACTIVITY_PUBLISH,
            PermissionEnum::SURVEY_CHECK,
            PermissionEnum::SURVEY_CREATE,
            PermissionEnum::SURVEY_EDIT,
            PermissionEnum::SURVEY_REMOVE,
            PermissionEnum::SURVEY_PUBLISH,
            PermissionEnum::ATTENDANCE_REPORT,
            PermissionEnum::PLACES_EDIT,
            PermissionEnum::PLACES_DELETE,
        ],
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
                'name' => $permission
            ]);
        }

        $rol = Role::firstOrCreate(["name" => Role::SUPERADMIN]);
        $rol->syncPermissions(PermissionEnum::cases());

        foreach (self::ROLES as $name => $permissions) {
            $role = Role::firstOrCreate([
                'name' => $name
            ]);

            $role->syncPermissions($permissions);
        }
    }
}
