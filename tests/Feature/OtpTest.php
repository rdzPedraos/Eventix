<?php

namespace Tests\Feature;

use App\Library\OtpLibrary;
use App\Mail\OtpMail;
use Illuminate\Support\Facades\Mail;
use Mockery;
use Tests\TestCase;

class OtpTest extends TestCase
{
    public function test_must_throw_exception_if_parameters_are_missing()
    {
        $response = $this->post(route('otp.send'), []);

        $response->assertStatus(302);
        $response->assertSessionHasErrors(['document_number', 'source']);
    }

    public function test_must_send_email_otp()
    {
        Mail::fake(); // Falsifica el envío de correos

        // Ejecuta la acción de enviar el OTP
        $response = $this->post(route('otp.send'), [
            'document_number' => '123456789',
            'source' => 'test@example.com',
        ]);

        $response->assertStatus(200);

        // Verifica que el correo fue enviado
        Mail::assertSent(OtpMail::class, function ($mail) {
            return $mail->hasTo('test@example.com');
        });
    }

    public function test_must_verify_email_otp()
    {
        // Configura el mock de OtpLibrary para verificar OTP
        OtpLibrary::setOtpToken('12345678', 'test@example.com', '12345');

        // Ejecuta la acción de verificar el OTP
        $response = $this->post(route('otp.verify'), [
            'document_number' => '12345678',
            'source' => 'test@example.com',
            'otp' => "12345",
        ]);

        $response->assertStatus(200);
    }

    public function test_must_throw_exception_if_otp_is_invalid()
    {
        // Ejecuta la acción con un OTP inválido
        $response = $this->post(route('otp.verify'), [
            'source' => 'test@example.com',
            'document_number' => '123456789',
            'otp' => '56789',
        ]);

        $response->assertStatus(302);
        $response->assertSessionHasErrors(['otp']);
    }
}
