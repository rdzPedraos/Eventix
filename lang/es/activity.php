<?php

use App\Enums\ActivityStatusEnum;

return [
    "status" => [
        ActivityStatusEnum::EDITING->value => "en edición",
        ActivityStatusEnum::PUBLISHED->value => "publicado",
        ActivityStatusEnum::CANCELED->value => "cancelado",
    ]
];
