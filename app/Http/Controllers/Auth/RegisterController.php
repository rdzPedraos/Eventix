<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Library\OtpLibrary;
use App\Mail\OtpMail;
use App\Models\DocumentType;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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

    public function validateData(RegisterRequest $request)
    {
        $otp = OtpLibrary::create($request->document_number, $request->email);
        Mail::to($request->email)->send(new OtpMail($otp));

        return response()->json();
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
