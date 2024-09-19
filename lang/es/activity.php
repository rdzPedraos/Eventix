<?php

use App\Enums\ActivityStatusEnum;

return [
    "status" => [
        ActivityStatusEnum::EDITING->name => "edicion",
        ActivityStatusEnum::PUBLISHED->name => "publicado",
        ActivityStatusEnum::CANCELED->name => "cancelado",
    ]
];
