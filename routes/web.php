<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::resource("login", LoginController::class)->only(["index", "store"])->name("index", "login");
Route::get("logout", [LoginController::class, "destroy"])->name("logout");

Route::middleware("auth")->group(function () {
    Route::get('/', function () {
        return Inertia::render("Home");
    });
});
