<?php

namespace App\Http\Requests;

use App\Models\DocumentType;
use App\Rules\PhoneValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UserUpdateRequest extends FormRequest
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
        $user = $this->route("user");

        return [
            "document_type_code" => ["required", "exists:document_types,code"],
            "document_number" => ["required", "string", "unique:users,document_number,$user->id"],
            "phone" => ["required", new PhoneValidationRule],
            "name" => ["required", "string", "min:2", "max:25", "regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/"],
            "last_name" => ["required", "string", "min:2", "max:25", "regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/"],
        ];
    }

    public function after()
    {
        return [
            function (Validator $validator) {
                if ($this->document_type_code) {
                    $regex = DocumentType::find($this->document_type_code)->regex;

                    $validator->errors()->addIf(
                        !preg_match("/$regex/", $this->document_number),
                        "document_number",
                        __("validation.regex", ["attribute" => __("validation.attributes.document_number")])
                    );
                }
            }
        ];
    }
}
