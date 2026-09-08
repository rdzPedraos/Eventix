<?php

use App\Http\Controllers\PingController;
use App\Http\Controllers\SitesController;
use Illuminate\Support\Facades\Route;

Route::get("/ping", [PingController::class, "show"])->name("api.ping");
Route::get("/sites", [SitesController::class, "getByapi"])->name(name: "api.sites.list");
