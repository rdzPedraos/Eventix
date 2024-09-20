<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::get("/ping", fn() => response()->json(["message" => "pong"]));

Route::get("/activities", [EventController::class, "index"])->name("api.activities.index");
