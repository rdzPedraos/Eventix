<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Casts\NameCast;
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

    /* scopes */
    public function scopeSearch($query, string|null $search)
    {
        if (!$search) return $query;

        return $query->where('name', 'like', "%$search%")
            ->orWhere('last_name', 'like', "%$search%")
            ->orWhere('email', 'like', "%$search%");
    }

    /* relations */

    public function activities()
    {
        return $this->hasMany(Activity::class, 'created_by');
    }

    public function enrolledActivities()
    {
        return $this->belongsToMany(Activity::class, "inscriptions")
            ->withPivot('registered_at');
    }

    public function surveys()
    {
        return $this->hasMany(Survey::class);
    }
}
