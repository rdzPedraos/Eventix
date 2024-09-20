<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActivityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'image' => ["nullable", "image", "mimes:jpeg,png,jpg,gif", "max:2048"],
            "color" => ["required", "string", "regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/"],
        ];
    }
}
