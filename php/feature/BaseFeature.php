<?php
declare(strict_types=1);

// AnkusiWheelFitment SDK base feature

class AnkusiWheelFitmentBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AnkusiWheelFitmentContext $ctx, array $options): void {}
    public function PostConstruct(AnkusiWheelFitmentContext $ctx): void {}
    public function PostConstructEntity(AnkusiWheelFitmentContext $ctx): void {}
    public function SetData(AnkusiWheelFitmentContext $ctx): void {}
    public function GetData(AnkusiWheelFitmentContext $ctx): void {}
    public function GetMatch(AnkusiWheelFitmentContext $ctx): void {}
    public function SetMatch(AnkusiWheelFitmentContext $ctx): void {}
    public function PrePoint(AnkusiWheelFitmentContext $ctx): void {}
    public function PreSpec(AnkusiWheelFitmentContext $ctx): void {}
    public function PreRequest(AnkusiWheelFitmentContext $ctx): void {}
    public function PreResponse(AnkusiWheelFitmentContext $ctx): void {}
    public function PreResult(AnkusiWheelFitmentContext $ctx): void {}
    public function PreDone(AnkusiWheelFitmentContext $ctx): void {}
    public function PreUnexpected(AnkusiWheelFitmentContext $ctx): void {}
}
