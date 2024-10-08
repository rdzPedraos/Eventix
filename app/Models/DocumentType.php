<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{
    use HasFactory;
    public $timestamps = false;


    protected $primaryKey = "code";
    protected $keyType = "string";



    /* RELATIONS */
}
