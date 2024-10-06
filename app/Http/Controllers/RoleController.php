<?php

namespace App\Http\Controllers;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $roles = Role::search($request->input("search"))
            ->paginate($request->per_page ?? 10);

        $roles = RoleResource::collection($roles);

        return Inertia::render("Role/List", compact("roles"));
    }

    public function edit(Role $role)
    {
        $role->load("permissions");
        $role->append("label");
        $permissions = PermissionEnum::casesKeyLabel();

        return Inertia::render("Role/Edit", compact("role", "permissions"));
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            "permissions" => ["required", "array", "exists:permissions,name"],
        ]);

        $role->syncPermissions($validated["permissions"]);
        return redirect()->route("roles.index");
    }
}
