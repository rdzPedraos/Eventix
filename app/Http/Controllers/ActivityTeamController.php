<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ActivityTeamController extends Controller
{
    public function index(Activity $activity, Request $request)
    {
        $builders = $activity->builders()->search($request->input("search"))
            ->orderBy("name")
            ->paginate($request->per_page ?? 10);

        $builders = UserResource::collection($builders);

        return Inertia::render("Team", compact("activity", "builders"));
    }

    public function store(Request $request, Activity $activity)
    {
        $validated = $request->validate([
            "email" => ["required", "exists:users,email"]
        ], [
            "email.exists" => "El usuario no se encuentra registrado"
        ]);

        $user = User::where($validated)->first();

        if ($activity->builders()->where("id", $user->id)->exists()) {
            throw ValidationException::withMessages(["email" => "El usuario ya se encuentra inscrito en la actividad"]);
        }

        $activity->builders()->attach($user);
        return redirect()->back();
    }

    public function destroy(Activity $activity, User $user)
    {
        $activity->builders()->detach($user);
        return redirect()->back();
    }
}
