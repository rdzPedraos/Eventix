<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
            DocumentTypesSeeder::class,
            PermissionSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Super Admin',
            "email" => "super@test.com"
        ])->assignRole(Role::SUPERADMIN);

        if (!app()->environment('production')) {
            $this->call(TestingSeeder::class);
        }
    }
}
