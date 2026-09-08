<?php

use App\Http\Controllers\SitesController;
use App\Http\Controllers\VersionController;
use Illuminate\Support\Facades\Route;

Route::get("/version", [VersionController::class, "show"])->name("api.version");
Route::get("/sites", [SitesController::class, "getByapi"])->name(name: "api.sites.list");
