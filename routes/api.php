<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::get("/ping", fn() => response()->json(["message" => "pong"]));

Route::get("/sites", [EventController::class, "getSites"])->name(name: "api.sites.list");
