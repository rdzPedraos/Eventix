<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Activity;
use App\Models\Scheduler;
use App\Models\Sites;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ActivitiesSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //delete all files and ocntent, set empty disk. NOTE WITHOUT REMOVE FOLDER AND .GITIGNORE FILE. AVOID DELETE GITIGNORE FILE
        $disk = Storage::disk('public');
        $disk->delete(array_filter($disk->allFiles(), fn($path) => $path !== ".gitignore"));

        Activity::factory(10)->create();
        Scheduler::factory(15)->create();
        Survey::factory(6)->create();
    }
}
