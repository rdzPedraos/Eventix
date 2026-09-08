<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class VersionController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json([
            'name' => config('app.name'),
            'environment' => config('app.env'),
        ]);
    }
}
