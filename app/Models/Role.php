<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory;

    const SUPERADMIN = "superadmin";
    const ADMIN = "admin";
    const BIENESTAR = "bienestar";

    /* SCOPES */
    public function scopeSearch($query, $search)
    {
        if (!$search) return $query;

        return $query->where("name", "like", "%$search%");
    }
}
