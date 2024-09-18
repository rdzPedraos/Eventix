<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $primaryKey = "iso_code";
    protected $keyType = "string";



    /* RELATIONS */
    public function documentTypes()
    {
        return $this->hasMany(DocumentType::class);
    }
}
