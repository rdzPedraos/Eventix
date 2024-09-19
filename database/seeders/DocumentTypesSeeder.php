<?php

namespace Database\Seeders;

use App\Models\DocumentType;
use Illuminate\Database\Seeder;

class DocumentTypesSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $dt = [
            [
                "code" => "CC",
                "name" => "Cédula de Ciudadanía",
                "regex" => "^(\d{6,10})$",
            ],
            [
                "code" => "CE",
                "name" => "Cédula de Extranjería",
                "regex" => "^(\d{6,10})$",
            ],
            [
                "code" => "TI",
                "name" => "Tarjeta de Identidad",
                "regex" => "^(\d{6,10})$",
            ],
            [
                "code" => "PP",
                "name" => "Pasaporte",
                "regex" => "^([A-Z0-9]{6,10})$",
            ],
            [
                "code" => "UNDF",
                "name" => "OTRO",
                "regex" => "^(\d{6,10})$",
            ]
        ];

        foreach ($dt as $d) {
            DocumentType::firstOrCreate($d);
        }
    }
}
