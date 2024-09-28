<?php

namespace App\Models;

use App\Enums\QuestionTypesEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'survey_id',
        'label',
        'type',
        'is_required',
        'order',
        'options',
    ];

    protected $casts = [
        'options' => 'array',
        'type' => QuestionTypesEnum::class,
    ];

    /* RELATIONS */
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }
}
