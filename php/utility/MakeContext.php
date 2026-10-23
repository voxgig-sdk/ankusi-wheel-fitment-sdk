<?php
declare(strict_types=1);

// AnkusiWheelFitment SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AnkusiWheelFitmentMakeContext
{
    public static function call(array $ctxmap, ?AnkusiWheelFitmentContext $basectx): AnkusiWheelFitmentContext
    {
        return new AnkusiWheelFitmentContext($ctxmap, $basectx);
    }
}
