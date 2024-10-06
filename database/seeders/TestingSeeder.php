<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Sites;
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
        ])->assignRole(Role::ADMIN);

        User::factory()->create([
            'name' => 'Bienestar User',
            'email' => 'bienestar@test.com',
        ])->assignRole(Role::BIENESTAR);

        User::factory(10)->create();
        Sites::factory(3)->create();

        $this->call([
            ActivitiesSeeder::class,
        ]);
    }
}
