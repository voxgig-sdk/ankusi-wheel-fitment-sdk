<?php
declare(strict_types=1);

// Typed models for the AnkusiWheelFitment SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Dataset entity data model. */
class Dataset
{
    public array $changelog;
    public array $columns;
    public array $data;
    public string $license;
    public string $name;
    public int $records;
    public string $source;
    public string $version;
}

/** Request payload for Dataset#load. */
class DatasetLoadMatch
{
    public ?array $changelog = null;
    public ?array $columns = null;
    public ?array $data = null;
    public ?string $license = null;
    public ?string $name = null;
    public ?int $records = null;
    public ?string $source = null;
    public ?string $version = null;
}

/** Request payload for Dataset#list. */
class DatasetListMatch
{
    public ?array $changelog = null;
    public ?array $columns = null;
    public ?array $data = null;
    public ?string $license = null;
    public ?string $name = null;
    public ?int $records = null;
    public ?string $source = null;
    public ?string $version = null;
}

/** Fitment entity data model. */
class Fitment
{
    public string $bolt_pattern;
    public string $center_bore_mm;
    public string $center_bore_rear_mm;
    public string $chassis_code;
    public string $flush_wheel;
    public int $lug_count;
    public string $make;
    public string $max_wheel;
    public string $model;
    public string $oe_wheel;
    public ?string $source_lang = null;
    public string $source_url;
    public int $vehicles;
    public string $year;
}

/** Request payload for Fitment#list. */
class FitmentListMatch
{
    public ?string $bolt_pattern = null;
    public ?int $limit = null;
    public ?string $make = null;
    public ?string $model = null;
    public ?int $year = null;
}

