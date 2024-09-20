<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get("/", fn() => redirect()->route("home"));
Route::inertia("/home", "Home")->name("home");

Route::post("otp/send", [OtpController::class, "create"])->name("otp.send");
Route::post("otp/verify", [OtpController::class, "verify"])->name("otp.verify");

Route::middleware("guest")->group(function () {
    Route::resource("login", LoginController::class)->only(["index", "store"])->name("index", "login");
    Route::resource("register", RegisterController::class)->only(["index", "store"]);
});

Route::middleware("auth")->group(function () {
    Route::get("logout", [LoginController::class, "destroy"])->name("logout");

    Route::resource("actividades", ActivityController::class)->names("activities");
});
