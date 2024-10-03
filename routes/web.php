<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\SitesController;
use App\Http\Controllers\SurveyController;
use Illuminate\Support\Facades\Route;

Route::get("/", fn() => redirect()->route("home"));
Route::inertia("/home", "Home")->name("home");
Route::get("/eventos", [EventController::class, "index"])->name("events.index");

Route::resource("register", RegisterController::class)->only(["index", "store"]);
Route::post("register/pre-validate", [RegisterController::class, "validateData"])->name("register.validate");
Route::post("otp/send", [OtpController::class, "create"])->name("otp.send");
Route::post("otp/verify", [OtpController::class, "verify"])->name("otp.verify");

Route::middleware("guest")->group(function () {
    Route::resource("login", LoginController::class)->only(["index", "store"])->name("index", "login");
});


Route::middleware("auth")->group(function () {
    Route::get("logout", [LoginController::class, "destroy"])->name("logout");

    Route::post("/eventos/inscribir/{activity}", [EventController::class, "subscribe"])->name("events.subscribe");
    Route::post("/eventos/desinscribir/{activity}", [EventController::class, "unsubscribe"])->name("events.unsubscribe");

    Route::resource("actividades", ActivityController::class)->parameters(["actividades" => "activity"])->names("activities");

    Route::resource("espacios-academicos", SitesController::class)->parameters(["espacios-academicos" => "site"])->names("sites");

    Route::resource("encuestas", controller: SurveyController::class)->parameters(["encuestas" => "survey"])->names("surveys");
    Route::get("encuestas/r/{token}", [SurveyController::class, "answer"])->name("surveys.answer");
    Route::post("encuestas/r/{token}", [SurveyController::class, "storeAnswer"])->name("surveys.answer.store");
});
