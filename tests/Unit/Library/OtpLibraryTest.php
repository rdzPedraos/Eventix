<?php

namespace Tests\Unit\Library;

use App\Library\OtpLibrary;
use Exception;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class OtpLibraryTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
    }

    public function test_generate_otp_with_default_length_and_digits(): void
    {
        $otp = OtpLibrary::generateOtp();

        $this->assertSame(5, strlen($otp));
        $this->assertMatchesRegularExpression("/^\\d{5}$/", $otp);
    }

    public function test_generate_otp_with_custom_size_and_letters(): void
    {
        $otp = OtpLibrary::generateOtp(8, true);

        $this->assertSame(8, strlen($otp));
        $this->assertMatchesRegularExpression("/^[A-Z]{8}$/", $otp);
    }

    public function test_create_stores_otp_in_cache(): void
    {
        $otp = OtpLibrary::create("123456789", "user@example.com");

        $this->assertSame(5, strlen($otp));
        $this->assertTrue(OtpLibrary::verify("123456789", "user@example.com", $otp));
    }

    public function test_verify_throws_when_otp_expired(): void
    {
        $this->expectException(Exception::class);

        OtpLibrary::verify("123456789", "user@example.com", "12345");
    }

    public function test_verify_throws_when_otp_is_invalid(): void
    {
        OtpLibrary::setOtpToken("123456789", "user@example.com", "12345");

        $this->expectException(Exception::class);

        OtpLibrary::verify("123456789", "user@example.com", "99999");
    }

    public function test_remove_deletes_cached_otp(): void
    {
        OtpLibrary::setOtpToken("123456789", "user@example.com", "12345");
        OtpLibrary::remove("123456789", "user@example.com");

        $this->expectException(Exception::class);

        OtpLibrary::verify("123456789", "user@example.com", "12345");
    }
}
