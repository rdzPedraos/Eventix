<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Auth/Login");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "email" => ["required", "email"],
            "password" => ["required"],
            "remember" => ["nullable", "boolean"],
        ]);

        if (
            Auth::attempt(
                $request->only("email", "password"),
                $request->get("remember")
            )
        ) {
            $request->session()->regenerate();
            return redirect()->intended();
        }

        return back()->withErrors([
            "email" => __("auth.failed")
        ]);
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        #$request->session()->regenerateToken();

        return redirect()->route("login");
    }
}
