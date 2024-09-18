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
        $user_auth = Auth::user();

        //Si está autenticado, sólo permitirá usar el otp si el usuario autenticado es el mismo que está validando el otp.
        if ($user_auth) {
            return $user_auth->document_number == $this->input("document_number");
        }

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

        $rules = [
            "document_number" => ["required", "string"],
            "source" => ["required", "string"],
            "channel" => ["required", "string", "in:email,sms"],
            "otp" => ["nullable", "string", "size:5"],
        ];

        //Si no está autenticado, permitirá usar el otp si el email no está registrado en la base de datos.
        if (!$auth) {
            $column = $this->input("channel") == "email" ? "email" : "phone";

            $rules["document_number"][] = "unique:users,document_number";
            $rules["source"][] = "unique:users,$column";
        }

        if ($this->route()->getName() == "otp.verify") {
            $rules["otp"][] = "required";
        }

        return $rules;
    }
}
