<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\DocumentType;
use App\Models\User;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    const Countries = [
        [
            "iso_code" => "COL",
            "name" => "Colombia",
            "documentTypes" => [
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
            ]
        ],
        [
            "iso_code" => "VEN",
            "name" => "Venezuela",
            "documentTypes" => [
                [
                    "code" => "VEJPG",
                    "name" => "Venezolano",
                    "regex" => "^([VEJPG]{1})(\d{6,10})$",
                ],
            ]
        ],
    ];

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach (self::Countries as $country) {
            Country::create([
                "iso_code" => $country["iso_code"],
                "name" => $country["name"],
            ]);

            foreach ($country["documentTypes"] as $documentType) {
                DocumentType::create([
                    "code" => $documentType["code"],
                    "name" => $documentType["name"],
                    "country_iso_code" => $country["iso_code"],
                    "regex" => $documentType["regex"],
                ]);
            }
        }
    }
}
