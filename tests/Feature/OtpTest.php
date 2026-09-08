<?php

namespace Tests\Feature;

use App\Library\OtpLibrary;
use App\Mail\OtpMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\DatabasePresenceVerifier;
use Mockery;
use Tests\TestCase;

class OtpTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $verifier = Mockery::mock(DatabasePresenceVerifier::class);
        $verifier->shouldReceive('setConnection')->andReturnSelf();
        $verifier->shouldReceive('getCount')->andReturn(0);
        $verifier->shouldReceive('getMultiCount')->andReturn(0);

        $this->app->instance('validation.presence', $verifier);
    }

    public function test_must_throw_exception_if_parameters_are_missing()
    {
        $response = $this->post(route('otp.send'), []);

        $response->assertStatus(302);
        $response->assertSessionHasErrors(['document_number', 'source']);
    }

    public function test_must_send_email_otp()
    {
        Mail::fake();

        $response = $this->post(route('otp.send'), [
            'document_number' => '123456789',
            'source' => 'test@example.com',
        ]);

        $response->assertStatus(200);

        Mail::assertSent(OtpMail::class, function ($mail) {
            return $mail->hasTo('test@example.com');
        });
    }

    public function test_must_verify_email_otp()
    {
        OtpLibrary::setOtpToken('12345678', 'test@example.com', '12345');

        $response = $this->post(route('otp.verify'), [
            'document_number' => '12345678',
            'source' => 'test@example.com',
            'otp' => '12345',
        ]);

        $response->assertStatus(200);
    }

    public function test_must_throw_exception_if_otp_is_invalid()
    {
        $response = $this->post(route('otp.verify'), [
            'source' => 'test@example.com',
            'document_number' => '123456789',
            'otp' => '56789',
        ]);

        $response->assertStatus(302);
        $response->assertSessionHasErrors(['otp']);
    }
}
