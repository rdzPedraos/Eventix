<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class OtpRequest extends FormRequest
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
        $auth = Auth::user();

        //only allow unique document_number and source for users not registered or for the authenticated user
        $uniqueDocument = "unique:users,document_number";
        $uniqueSource = "unique:users,email";

        if ($auth) {
            $uniqueDocument .= ",$auth->id";
            $uniqueSource .= ",$auth->id";
        }

        $rules = [
            "document_number" => ["required", "string", $uniqueDocument],
            "source" => ["required", "string", $uniqueSource],
            "otp" => ["nullable", "string", "size:5"],
        ];

        if ($this->route()->getName() == "otp.verify") {
            $rules["otp"][] = "required";
        }

        return $rules;
    }

    public function attributes(): array
    {
        return [
            "source" => __("validation.attributes.email")
        ];
    }
}
