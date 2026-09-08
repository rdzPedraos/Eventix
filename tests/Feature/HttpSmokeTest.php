<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\DatabaseTestCase;

class HttpSmokeTest extends DatabaseTestCase
{
    public function test_health_endpoint_is_up(): void
    {
        $this->get('/up')->assertOk();
    }

    public function test_root_redirects_to_home(): void
    {
        $this->get('/')->assertRedirect(route('home'));
    }

    public function test_home_page_loads(): void
    {
        $this->get(route('home'))->assertOk();
    }

    public function test_login_page_loads(): void
    {
        $this->get(route('login'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Auth/Login'));
    }

    public function test_register_page_loads(): void
    {
        $this->get(route('register.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Auth/Register'));
    }

    public function test_password_request_page_loads(): void
    {
        $this->get(route('password.request'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->component('Auth/Password/Forgot'));
    }

    public function test_guest_is_redirected_from_protected_routes(): void
    {
        $this->get(route('activities.index'))->assertRedirect(route('login'));
    }

    public function test_user_can_log_in(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'secret',
        ]);

        $response = $this->post(route('login.store'), [
            'email' => 'user@example.com',
            'password' => 'secret',
        ]);

        $response->assertRedirect();
        $this->assertAuthenticatedAs($user);
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'secret',
        ]);

        $response = $this->from(route('login'))->post(route('login.store'), [
            'email' => 'user@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertRedirect(route('login'));
        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_events_index_requires_query_parameters(): void
    {
        $response = $this->get(route('events.index'));

        $response->assertStatus(302);
        $response->assertSessionHasErrors(['day', 'mode']);
    }

    public function test_events_index_returns_json_with_valid_filters(): void
    {
        $response = $this->get(route('events.index', [
            'day' => '2024-06-01',
            'mode' => 'day',
        ]));

        $response->assertOk();
        $response->assertJson([]);
    }
}
