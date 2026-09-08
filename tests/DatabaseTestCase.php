<?php

namespace Tests;

use Database\Seeders\DocumentTypesSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

abstract class DatabaseTestCase extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(DocumentTypesSeeder::class);
    }
}
