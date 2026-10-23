<?php
declare(strict_types=1);

// AnkusiWheelFitment SDK exists test

require_once __DIR__ . '/../ankusiwheelfitment_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AnkusiWheelFitmentSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
