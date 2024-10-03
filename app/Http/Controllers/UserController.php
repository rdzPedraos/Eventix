<?php

namespace App\Http\Controllers;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\DocumentType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::paginate($request->per_page ?? 10);
        $users = UserResource::collection($users);

        return inertia("User/List", compact("users"));
    }

    public function edit(User $user)
    {
        $documentTypes = DocumentType::all();

        if (!Auth::user()->can(PermissionEnum::USERS_EDIT->value)) {
            return inertia("User/Edit", compact("user", "documentTypes"));
        }


        $roles = RoleEnum::casesKeyLabel();
        $currentRoles = $user->roles->pluck("name")->toArray();

        return inertia("User/Edit/asAdmin", compact("user", "documentTypes", "roles", "currentRoles"));
    }

    public function update(User $user, UserUpdateRequest $request)
    {
        $user->update($request->validated());
        return redirect()->route("users.edit", $user);
    }

    public function updateRoles(User $user, Request $request)
    {
        $user->syncRoles($request->roles);
        return redirect()->route("users.edit", $user);
    }
}