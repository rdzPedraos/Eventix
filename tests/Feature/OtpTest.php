<?php

namespace Tests\Feature;

use App\Library\OtpLibrary;
use App\Mail\OtpMail;
use Illuminate\Support\Facades\Mail;
use Mockery;
use Mockery\Mock;
use Tests\TestCase;

class OtpTest extends TestCase
{
    public function test_send_email_otp()
    {
        Mail::fake();

        // Simula la creación del OTPs
        Mockery::mock("alias:".OtpLibrary::class)
            ->shouldReceive('create')
            ->once()
            ->with('123456789', 'test@example.com')
            ->andReturn('12345');


        // Ejecuta la acción de enviar el OTP
        $response = $this->post(route('otp.send'), [
            'document_number' => '123456789',
            "channel" => "email",
            'source' => 'test@example.com'
        ]);

        $response->assertStatus(200);

        // Verifica que el correo fue enviado
        Mail::assertSent(OtpMail::class, function ($mail) {
            return $mail->hasTo('test@example.com') && $mail->otp === '12345';
        });
    }

    public function test_verify_email_otp()
    {
        $mock = Mockery::mock("alias:" . OtpLibrary::class);
        
        $mock->shouldReceive('verify')
            ->once()
            ->with('123456789', 'test@example.com', '12345')
            ->andReturn(true);
        
        $mock->shouldReceive('remove')
            ->once()
            ->with('123456789', 'test@example.com');
        
        // Ejecuta la acción de verificar el OTP
        $response = $this->post(route('otp.verify'), [
            'document_number' => '123456789',
            'source' => 'test@example.com',
            "channel" => "email",
            'otp' => '12345'
        ]);

        $response->assertStatus(200);
    }
}
