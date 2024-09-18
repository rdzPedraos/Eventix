<?php

namespace App\Http\Requests;

use App\Http\Controllers\Auth\OtpController;
use App\Models\DocumentType;
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
        return [
            "document_type_code" => ["required", "exists:document_types,code"],
            "document_number" => ["required", "string", "unique:users,document_number"],
            "email" => ["required", "email", "max:255", "unique:users,email", "max:1"],
            "phone" => ["required", "numeric"],
            "name" => ["required", "string", "max:255"],
            "last_name" => ["required", "string", "max:255"],
            "verify_otp" => ["nullable", "string"],
            "otp" => ["nullable", "string", "size:5"],
            "password" => ["required", "string", "min:8"],
        ];
    }

    public function after()
    {
        return [
            function (Validator $validator) {
                $regex = DocumentType::find($this->document_type_code)->regex;
                if (!preg_match("/$regex/", $this->document_number)) {
                    $validator->errors()->add("document_number", "The document number is invalid.");
                }

                $verify_otp = Crypt::decrypt($this->input("verify_otp"));
                $otp = $this->input("otp");

                if ($verify_otp != $otp) {
                    $validator->errors()->add("otp", "The otp is invalid.");
                }
            }
        ];
    }
}
