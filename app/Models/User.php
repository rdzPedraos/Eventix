<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Casts\NameCast;
use App\Enums\RoleEnum;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        "last_name",
        "document_type_code",
        "document_number",
        "email",
        'phone',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'name' => NameCast::class,
            'last_name' => NameCast::class,
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isSuperAdmin(): bool
    {
        return $this->hasRole(RoleEnum::SUPER_ADMIN);
    }

    /* relations */

    public function activities()
    {
        return $this->hasMany(Activity::class, 'created_by');
    }
}
