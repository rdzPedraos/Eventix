<?php

namespace App\Http\Requests;

use App\Rules\Base64Image;
use Faker\Provider\Base;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

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
            "image" => ["nullable", new Base64Image()],
            "color" => ["required", "string", "regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/"],
            "schedulers" => ["required", "array", "min:1"],
            "schedulers.*.start_date" => ["required", "date"],
            "schedulers.*.end_date" => ["required", "date", "after:schedulers.*.start_date"],
            "schedulers.*.site_id" => ["required", "exists:sites,id,deleted_at,NULL"],
        ];
    }

    public function passedValidation()
    {
        $image = $this->get('image');
        if ($image) {
            $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image));
            $filename = 'activity_' . time() . '.png';

            file_put_contents(Storage::disk("public")->path($filename), $image);

            $this->merge(['image' => $filename]);
        }
    }

    public function attributes()
    {
        return [
            "schedulers.*.start_date" =>  __("validation.attributes.start_date"),
            "schedulers.*.end_date" => __("validation.attributes.end_date"),
            "schedulers.*.site_id" => __("validation.attributes.site_id"),
        ];
    }
}
