<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function request()
    {
        return Inertia::render("Auth/Password/Forgot");
    }

    public function sendEmail(Request $request)
    {
        $request->validate([
            "email" => ["required", "email"]
        ]);

        Password::sendResetLink(
            $request->only("email")
        );

        return redirect()->back();
    }

    public function reset(Request $request, string $token)
    {
        return Inertia::render("Auth/Password/Reset", [
            "token" => $token,
            "email" => $request->email
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            "token" => ["required"],
            "email" => ["required", "email"],
            "password" => ["required", "confirmed"]
        ]);

        $status = Password::reset(
            $request->only("email", "password", "password_confirmation", "token"),
            function ($user) use ($request) {
                $user->forceFill([
                    "password" => bcrypt($request->password)
                ])->save();
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            Auth::logout();
            return redirect()->route("login");
        }

        return back()->withInput()->withErrors([
            "email" => "El token de recuperación es inválido."
        ]);
    }
}
