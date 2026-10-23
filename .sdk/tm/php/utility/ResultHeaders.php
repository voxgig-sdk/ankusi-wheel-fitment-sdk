<?php
declare(strict_types=1);

// AnkusiWheelFitment SDK utility: result_headers

class AnkusiWheelFitmentResultHeaders
{
    public static function call(AnkusiWheelFitmentContext $ctx): ?AnkusiWheelFitmentResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
