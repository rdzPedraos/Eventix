<?php

use App\Http\Controllers\SitesController;
use Illuminate\Support\Facades\Route;

Route::get("/sites", [SitesController::class, "getByapi"])->name(name: "api.sites.list");
