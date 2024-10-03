<?php

namespace App\Library;

class DownloadCSV
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
            $filename = "{$filename}-{$date}.csv";
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

    public function build()
    {
        $file = fopen($this->filename, 'w');

        // Escribir el BOM para UTF-8
        fwrite($file, "\xEF\xBB\xBF");

        // Escribir los encabezados
        fputcsv($file, $this->headers->values()->toArray());

        // Escribir los datos del cuerpo
        foreach ($this->body as $row) {
            $csvRow = [];
            foreach ($this->headers->keys() as $key) {
                $csvRow[] = $row[$key] ?? '';
            }
            fputcsv($file, $csvRow);
        }

        fclose($file);

        return $this->filename;
    }
}
