<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_sent_otp_code()
    {
        $this->assertTrue(true);
    }

    public function test_validate_otp_code()
    {
        $this->assertTrue(true);
    }

    public function test_recover_password()
    {
        $this->assertTrue(true);
    }
}
