<?php

namespace App\Providers;

use App\Enums\RoleEnum;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share("app", [
            "name" => config("app.name"),
            "locale" => app()->getLocale(),
        ]);

        // Define a gate to check if the user is a super admin
        Gate::before(function ($user, $ability) {
            if ($user->hasRole(RoleEnum::SUPER_ADMIN)) {
                return true;
            }
        });
    }
}
