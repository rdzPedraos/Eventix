<?php
$otp = $otp ?? '$otp';
$otp = str_split($otp);
?>

@extends('mail.layout')

@section('title', 'Comprobación de identidad')

@section('body')
    <p style="font-size: 16px;">Hola! este es tu código de verificación:</p>

    <div style="text-align: center; margin: 20px 0; user-select:none;">
        @foreach ($otp as $key => $value)
            <span
                style="display: inline-block; font-size: 24px; color: #ffffff; background-color: #00594f; padding: 10px 20px; border-radius: 5px; user-select:text;">{{ $value }}</span>
        @endforeach
    </div>

    <p style="font-size: 12px; font-style: italic">
        Este código expirará en 5 minutos. Si no has solicitado este código, simplemente ignora el mensaje.
    </p>
@endsection
