<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\DocumentType;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $documentTypes = DocumentType::all();

        return Inertia::render("Auth/Register", compact("documentTypes"));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request)
    {
        $u = User::create($request->validated());
        Auth::login($u);

        return redirect()->route("home");
    }
}
