<?php

namespace App\Library;

use Exception;

class OtpLibrary
{
    private static function getOtpKey(String $id, String $source): String
    {
        return "otp_{$id}_{$source}";
    }

    public static function create(String $id, String $source, int $size = 5, $withLetters = false): String
    {
        $otp = collect()->times(
            $size,
            fn() => $withLetters ? chr(rand(65, 90)) : rand(0, 9)
        )->join("");


        $cache_key = self::getOtpKey($id, $source);
        cache()->put($cache_key, $otp, now()->addMinutes(5));

        return $otp;
    }

    public static function verify($document_number, $source, $otp)
    {
        $cache_key = self::getOtpKey($document_number, $source);
        $cached_otp = cache()->get($cache_key);

        if (!$cached_otp) {
            throw new Exception(__("validation.code.expired", ["otp" => "otp"]));
        }

        if ($cached_otp != $otp) {
            throw new Exception(__("validation.code.invalid", ["otp" => "otp"]));
        }

        return true;
    }

    public static function remove($document_number, $source)
    {
        $cache_key = self::getOtpKey($document_number, $source);
        cache()->forget($cache_key);
    }
}
