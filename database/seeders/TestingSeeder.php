<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Activity;
use App\Models\Scheduler;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class TestingSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //delete all files and ocntent, set empty disk. NOTE WITHOUT REMOVE FOLDER AND .GITIGNORE FILE. AVOID DELETE GITIGNORE FILE
        $disk = Storage::disk('public');
        $disk->delete(array_filter($disk->allFiles(), fn($path) => $path !== ".gitignore"));

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
        Scheduler::factory(30)->create();
    }
}
