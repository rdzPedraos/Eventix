<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware("guest")->group(function () {
    Route::resource("login", LoginController::class)->only(["index", "store"])->name("index", "login");
});

Route::middleware("auth")->group(function () {
    Route::get("logout", [LoginController::class, "destroy"])->name("logout");
});

Route::get('/', function () {
    return Inertia::render("Home");
});
