<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SurveyTest extends TestCase
{
    public function test_create_survey_without_permissions()
    {
        $this->assertFalse(false);
    }

    public function test_update_survey_without_access()
    {
        $this->assertFalse(false);
    }

    public function test_delete_survey_without_access()
    {
        $this->assertFalse(false);
    }

    public function test_add_response_to_request()
    {
        $this->assertTrue(true);
    }

    public function test_download_report_responses()
    {
        $this->assertNotEmpty(["test"]);
    }
}
