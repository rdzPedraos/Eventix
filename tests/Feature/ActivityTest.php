<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ActivityTest extends TestCase
{
    public function test_create_activity_without_permissions()
    {
        $this->assertFalse(false);
    }

    public function test_update_activity_without_access()
    {
        $this->assertFalse(false);
    }

    public function test_delete_activity_without_access()
    {
        $this->assertFalse(false);
    }
}
