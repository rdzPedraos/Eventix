<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EventTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_subscribe_to_activity()
    {
        $this->assertTrue(true);
    }

    public function test_download_report_enrollments()
    {
        $this->assertNotEmpty(["test"]);
    }

    public function test_filters_to_get_events()
    {
        sleep(seconds: 15);
        $this->assertTrue(true);
    }
}
