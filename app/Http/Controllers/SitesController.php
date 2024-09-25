<?php

namespace App\Http\Controllers;

use App\Enums\PermissionEnum;
use App\Http\Requests\SideRequest;
use App\Http\Resources\SiteResource;
use App\Models\Sites;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

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
        $sites = Sites::orderBy("name")->paginate($request->per_page ?? 10);
        $sites = SiteResource::collection($sites);

        return Inertia::render("Sites/List", compact("sites"));
    }

    public function create()
    {
        return inertia("Sites/Create");
    }

    public function store(SideRequest $request)
    {
        $site = Sites::create($request->validated());
        return redirect()->route("sites.edit", $site);
    }

    public function edit(Sites $site)
    {
        return Inertia::render("Sites/Create", compact("site"));
    }

    public function update(SideRequest $request, Sites $site)
    {
        $site->update($request->validated());
        return redirect()->route("sites.edit", $site);
    }

    public function destroy(Sites $site)
    {
        $site->delete();
        return redirect()->back();
    }
}
