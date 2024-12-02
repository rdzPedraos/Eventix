<?php

namespace App\Library;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class DownloadFile
{
    private $filename;
    private $headers;
    private $body;

    public function __construct()
    {
        $this->headers = collect();
        $this->body = collect();
    }

    public function setFilename($filename, $addDate = true)
    {
        if ($addDate) {
            $date = now()->format("Y-m-d");
            $filename = "{$filename}-{$date}";
        }

        $this->filename = $filename;
        return $this;
    }

    public function addHeader($key, $label)
    {
        $this->headers->put($key, $label);
        return $this;
    }

    public function addHeaders($headers)
    {
        collect($headers)->each(function ($label, $key) {
            $this->addHeader($key, $label);
        });

        return $this;
    }

    public function addBodyRows($rows)
    {
        $this->body->push(...$rows);
        return $this;
    }

    public function buildCsv()
    {
        $filename = "{$this->filename}.csv";
        $file = fopen($filename, 'w');

        // Escribir el BOM para UTF-8
        fwrite($file, "\xEF\xBB\xBF");

        // Escribir los encabezados
        fputcsv($file, $this->headers->values()->toArray());

        // Escribir los datos del cuerpo
        foreach ($this->body as $row) {
            $csvRow = [];
            foreach ($this->headers->keys() as $key) {
                $csvRow[] = data_get($row, $key);
            }
            fputcsv($file, $csvRow);
        }

        fclose($file);

        return $filename;
    }

    public function buildExcel()
    {
        $filename = "{$this->filename}.xlsx";

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Escribir los encabezados
        $column = 'A';
        foreach ($this->headers->values() as $header) {
            $sheet->setCellValue("{$column}1", $header);
            $column++;
        }

        // Escribir los datos del cuerpo
        $rowNumber = 2;
        foreach ($this->body as $row) {
            $column = 'A';
            foreach ($this->headers->keys() as $key) {
                $sheet->setCellValue("{$column}{$rowNumber}", data_get($row, $key));
                $column++;
            }
            $rowNumber++;
        }

        $writer = new Xlsx($spreadsheet);
        $writer->save($filename);

        return $filename;
    }
}
