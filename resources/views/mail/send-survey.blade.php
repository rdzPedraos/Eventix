<?php
$cta = isset($link) ? 'Click aqui para responder' : '$link';
$link = $link ?? '$link';

$surveyName = isset($survey) ? $survey->name : '$survey->name';
$surveyDescription = isset($survey) ? $survey->description : '$survey->description';
?>

@extends('mail.layout')
@section('title', "Encuesta {$surveyName}")

@section('body')
    Hola! tienes una nueva encuesta para responder:

    <p>{{ $surveyDescription }}</p>

    <a href="{{ $link }}"
        style="
            display: block; 
            width: fit-content;
            margin: 20px auto; 
            padding: 10px 20px; 
            background-color: #00594f; 
            color: #ffffff; 
            border-radius: 5px; 
            cursor: pointer; 
            font-size: 16px; 
            text-decoration: none;
        ">
        {{ $cta }}
    </a>
@endsection
