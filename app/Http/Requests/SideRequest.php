<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SideRequest extends FormRequest
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
        $id = $this->route("site")?->id;

        return [
            "name" => ["required", "max:100", "regex:/^[a-zA-Z\s\d]+$/", "unique:sites,name,$id"],
            "address" => ["required", "max:255", "regex:/^[a-zA-Z\s\d\.\-\,]+$/"],
        ];
    }
}
