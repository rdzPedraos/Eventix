<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\OtpRequest;
use App\Mail\OtpMail;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class OtpController extends Controller
{
    public static function getKey($document_number, $source)
    {
        $time = now()->format("Ymd");
        return "otp_{$document_number}_{$source}_{$time}";
    }

    public function create(OtpRequest $request)
    {
        $otp = rand(10000, 99999);
        $cache_key = self::getKey($request->document_number, $request->source);

        cache()->put($cache_key, $otp, now()->addMinutes(5));

        Mail::to($request->source)->send(new OtpMail($otp));

        return response()->json();
    }

    public function verify(OtpRequest $request)
    {
        $cache_key = self::getKey($request->document_number, $request->source);
        $otp = cache()->get($cache_key);

        if (!$otp) {
            throw ValidationException::withMessages([
                "otp" => "The otp is expired.",
            ]);
        }

        if ($otp != $request->otp) {
            throw ValidationException::withMessages([
                "otp" => "The otp is invalid.",
            ]);
        }

        cache()->forget($cache_key);
        return response()->json([
            "token" => Crypt::encrypt($otp),
        ]);
    }
}
