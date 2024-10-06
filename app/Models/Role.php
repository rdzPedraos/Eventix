<?php

namespace App\Models;

use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory;

    public function getLabelAttribute(): string
    {
        return RoleEnum::from($this->name)->label();
    }

    /* SCOPES */
    public function scopeSearch($query, $search)
    {
        if (!$search) return $query;

        return $query->where("name", "like", "%$search%");
    }
}
