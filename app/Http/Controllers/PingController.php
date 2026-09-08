<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class PingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json([
            'ok' => true,
            'time' => now()->toIso8601String(),
        ]);
    }
}
