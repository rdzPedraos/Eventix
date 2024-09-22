<?php

namespace App\Http\Requests;

use App\Models\DocumentType;
use App\Rules\PhoneValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Validation\Validator;

class RegisterRequest extends FormRequest
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
        $rules = [
            "document_type_code" => ["required", "exists:document_types,code"],
            "document_number" => ["required", "string", "unique:users,document_number"],
            "email" => ["required", "email", "max:255", "unique:users,email"],
            "phone" => ["required", new PhoneValidationRule],
            "name" => ["required", "string", "min:2", "max:25", "regex:/^[a-zA-Z]+$/"],
            "last_name" => ["required", "string", "min:2", "max:25", "regex:/^[a-zA-Z\s]+$/"],
        ];

        if ($this->route()->getName() == "register.store") {
            $rules = [
                ...$rules,
                "verify_otp" => ["required", "string"],
                "otp" => ["required", "string", "size:5"],
                "password" => ["required", "string", "min:8"],
            ];
        }

        return $rules;
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

                if ($this->verify_otp) {
                    $verify_otp = Crypt::decrypt($this->input("verify_otp"));
                    $otp = $this->input("otp");

                    $validator->errors()->addIf(
                        $verify_otp != $otp,
                        "otp",
                        __("validation.code.invalid", ["attribute" => __("validation.attributes.otp")])
                    );
                }
            }
        ];
    }
}
