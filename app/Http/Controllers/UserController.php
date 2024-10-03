<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Models\DocumentType;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function edit(User $user)
    {
        $documentTypes = DocumentType::all();

        return inertia("User/Edit", compact("user", "documentTypes"));
    }

    public function update(User $user, UserUpdateRequest $request)
    {
        $user->update($request->validated());
        return redirect()->route("users.edit", $user);
    }
}
