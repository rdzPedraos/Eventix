<?php

namespace App\Http\Controllers;

use App\Enums\PermissionEnum;
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

    public function create()
    {
        $role = new Role(["permissions" => []]);
        $permissions = PermissionEnum::casesKeyLabel();

        return Inertia::render("Role/Edit", compact("role", "permissions"));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => ["required", "string", "max:255", "unique:roles"],
            "permissions" => ["required", "array", "exists:permissions,name"],
        ]);

        $role = Role::create($validated);
        $role->givePermissionTo($validated["permissions"]);

        return redirect()->route("roles.index");
    }

    public function edit(Role $role)
    {
        $role->load("permissions");
        $permissions = PermissionEnum::casesKeyLabel();

        return Inertia::render("Role/Edit", compact("role", "permissions"));
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            "name" => ["required", "string", "max:255"],
            "permissions" => ["required", "array", "exists:permissions,name"],
        ]);

        $role->update($validated);
        $role->syncPermissions($validated["permissions"]);

        return redirect()->route("roles.index");
    }
}
