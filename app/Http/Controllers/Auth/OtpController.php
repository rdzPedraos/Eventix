<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\OtpRequest;
use App\Library\OtpLibrary;
use App\Mail\OtpMail;
use Exception;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class OtpController extends Controller
{
    public function create(OtpRequest $request)
    {
        $otp = OtpLibrary::create($request->document_number, $request->source);
        Mail::to($request->source)->send(new OtpMail($otp));

        return response()->json();
    }

    public function verify(OtpRequest $request)
    {
        ["document_number" => $document_number, "source" => $source, "otp" => $otp] = $request->validated();

        try {
            OtpLibrary::verify($document_number, $source, $otp);
        } catch (Exception $e) {
            throw ValidationException::withMessages(["otp" => $e->getMessage()]);
        }

        OtpLibrary::remove($document_number, $source);

        return response()->json([
            "token" => Crypt::encrypt($otp),
        ]);
    }
}
