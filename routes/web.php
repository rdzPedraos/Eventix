<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\OtpController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SitesController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get("/", fn() => redirect()->route("home"));
Route::inertia("/home", "Home")->name("home");

Route::resource("login", LoginController::class)->only(["index", "store"])->name("index", "login")->middleware("guest");
Route::get("logout", [LoginController::class, "destroy"])->name("logout");

Route::get("register", [RegisterController::class, "index"])->name("register.index")->middleware("guest");
Route::post("register", [RegisterController::class, "store"])->name("register.store");
Route::post("register/pre-validate", [RegisterController::class, "validateData"])->name("register.validate");

Route::post("otp/send", [OtpController::class, "create"])->name("otp.send");
Route::post("otp/verify", [OtpController::class, "verify"])->name("otp.verify");

Route::get("/olvide-mi-clave", [PasswordController::class, "request"])->name("password.request")->middleware("guest");
Route::post("/olvide-mi-clave", [PasswordController::class, "sendEmail"]);
Route::get("/recuperar-clave/{token}", [PasswordController::class, "reset"])->name("password.reset");
Route::post("/recuperar-clave", [PasswordController::class, "update"])->name("password.update");

Route::get("/eventos", [EventController::class, "index"])->name("events.index");

Route::middleware("auth")->group(function () {
    Route::resource("actividades", ActivityController::class)->parameters(["actividades" => "activity"])->names("activities");
    Route::get("/actividades/{activity}/reporte", [ActivityController::class, "download"])->name("events.report");

    Route::post("/eventos/{activity}/inscribir", [EventController::class, "subscribe"])->name("events.subscribe");
    Route::post("/eventos/{activity}/desinscribir", [EventController::class, "unsubscribe"])->name("events.unsubscribe");

    Route::resource("encuestas", controller: SurveyController::class)->parameters(["encuestas" => "survey"])->names("surveys");
    Route::get("/encuestas/{survey}/reporte", [AnswerController::class, "download"])->name("answer.report");
    Route::get("/s/{token}", [AnswerController::class, "show"])->name("answer.show");
    Route::post("/s/{token}", [AnswerController::class, "store"])->name("answer.store");

    Route::resource("espacios-academicos", SitesController::class)->parameters(["espacios-academicos" => "site"])->names("sites");

    Route::resource("usuario", UserController::class)->parameters(["usuario" => "user"])->names("users");
    Route::put("usuario/{user}/roles", [UserController::class, "updateRoles"])->name("users.update_roles");

    Route::resource("roles", controller: RoleController::class)->names("roles");
});

Route::get("/template/{view}", function ($view) {
    $variables = request()->all();
    return view("mail/{$view}", $variables);
})->middleware("auth", "can:mail-templates.show");
