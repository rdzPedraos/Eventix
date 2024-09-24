<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\SitesController;
use Illuminate\Support\Facades\Route;

Route::get("/", fn() => redirect()->route("home"));
Route::inertia("/home", "Home")->name("home");

Route::resource("register", RegisterController::class)->only(["index", "store"]);
Route::post("register/pre-validate", [RegisterController::class, "validateData"])->name("register.validate");
Route::post("otp/send", [OtpController::class, "create"])->name("otp.send");
Route::post("otp/verify", [OtpController::class, "verify"])->name("otp.verify");

Route::middleware("guest")->group(function () {
    Route::resource("login", LoginController::class)->only(["index", "store"])->name("index", "login");
});

Route::middleware("auth")->group(function () {
    Route::get("logout", [LoginController::class, "destroy"])->name("logout");

    Route::resource("actividades", ActivityController::class)->parameters(["actividades" => "activity"])->names("activities");
    Route::resource("espacios-academicos", SitesController::class)->parameters(["espacios-academicos" => "site"])->names("sites");
});
