<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Base64Image implements ValidationRule
{
    protected int $maxSize;
    protected array $allowedMimeTypes;

    public function __construct(int $maxSize = 1048576, array $allowedMimeTypes = ['image/jpeg', 'image/png'])
    {
        $this->maxSize = $maxSize;
        $this->allowedMimeTypes = $allowedMimeTypes;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match('/^data:image\/(\w+);base64,/', $value)) {
            $fail(__("validation.base64.invalid_encode", ["attribute" => $attribute]));
        }

        $decodedImage = base64_decode(preg_replace('/^data:image\/(\w+);base64,/', '', $value), true);
        if ($decodedImage === false) {
            $fail(__("validation.base64.invalid_encode", ["attribute" => $attribute]));
        }

        if (strlen($decodedImage) > $this->maxSize) {
            $fail(__("validation.max.file", ["attribute" => $attribute, "max" => $this->maxSize]));
        }


        $finfo = finfo_open();
        $mimeType = finfo_buffer($finfo, $decodedImage, FILEINFO_MIME_TYPE);
        finfo_close($finfo);

        if (!in_array($mimeType, $this->allowedMimeTypes)) {
            $fail(__("validation.mimetypes", ["attribute" => $attribute, "values" => implode(", ", $this->allowedMimeTypes)]));
        }
    }
}
