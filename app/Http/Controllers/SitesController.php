<?php

namespace App\Http\Controllers;

use App\Enums\PermissionEnum;
use App\Http\Resources\SiteResource;
use App\Models\Sites;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;

class SitesController extends Controller
{
    public function middleware()
    {
        return [
            new Middleware("permission:" . PermissionEnum::PLACES_EDIT->value, ["index", "create", "store", "edit", "update"]),
            new Middleware("permission:" . PermissionEnum::PLACES_EDIT->value, ["destroy"]),
        ];
    }

    public function index(Request $request)
    {
        $sites = Sites::paginate($request->per_page ?? 10);
        $sites = SiteResource::collection($sites);

        return inertia("Sites/List", compact("sites"));
    }
}
