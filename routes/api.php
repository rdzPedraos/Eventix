<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\SitesController;
use Illuminate\Support\Facades\Route;

Route::get("/ping", fn() => response()->json(["message" => "pong"]));

Route::get("/sites", [SitesController::class, "getByapi"])->name(name: "api.sites.list");
