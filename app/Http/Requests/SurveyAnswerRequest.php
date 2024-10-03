<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SurveyAnswerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();
        return $user && $user->id === $this->user_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "user_id" => ["required", "exists:users,id"],
            "survey_id" => ["required", "exists:surveys,id"],
        ];
    }

    public function prepareForValidation()
    {
        $token = $this->route("token");
        $token = decrypt($token);

        if (!isset($token["user_id"]) || !isset($token["survey_id"])) {
            abort(404);
        }

        $this->merge([
            "user_id" => $token["user_id"],
            "survey_id" => $token["survey_id"],
        ]);
    }
}
