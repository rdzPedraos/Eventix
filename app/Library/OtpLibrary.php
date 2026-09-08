<?php

namespace App\Library;

use Exception;

class OtpLibrary
{
    private const TTL_MINUTES = 5;

    private static function getOtpKey(string $id, string $source): string
    {
        return "otp_{$id}_{$source}";
    }

    public static function generateOtp(int $size = 5, $withLetters = false): string
    {
        return collect()->times(
            $size,
            fn () => $withLetters ? chr(rand(65, 90)) : rand(0, 9)
        )->join("");
    }

    public static function setOtpToken(string $id, string $source, string $otp): void
    {
        $cache_key = self::getOtpKey($id, $source);
        cache()->put($cache_key, $otp, now()->addMinutes(self::TTL_MINUTES));
    }

    public static function create(string $id, string $source, int $size = 5, $withLetters = false): string
    {
        $otp = self::generateOtp($size, $withLetters);
        self::setOtpToken($id, $source, $otp);

        return $otp;
    }

    public static function verify($document_number, $source, $otp)
    {
        $cache_key = self::getOtpKey($document_number, $source);
        $cached_otp = cache()->get($cache_key);

        if (! $cached_otp) {
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
