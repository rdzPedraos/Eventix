<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sites extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        "name",
        "address",
    ];

    /* SCOPES */
    public function scopeSearch($query, $search)
    {
        if (!$search) return $query;

        return $query->where("name", "like", "%$search%")
            ->orWhere("address", "like", "%$search%");
    }
}
