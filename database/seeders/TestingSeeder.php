<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestingSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
        ]);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
        ])->assignRole(RoleEnum::ADMIN);

        User::factory()->create([
            'name' => 'Bienestar User',
            'email' => 'bienestar@test.com',
        ])->assignRole(RoleEnum::BIENESTAR);

        User::factory()->create([
            'name' => 'Super Admin',
            "email" => "super@test.com"
        ])->assignRole(RoleEnum::SUPER_ADMIN);

        Activity::factory(10)->create();
    }
}
