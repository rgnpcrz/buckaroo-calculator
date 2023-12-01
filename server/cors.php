<?php

function handleCORS() {
    $allowedOrigins = [
        'http://localhost:3000',
        'https://www.buckaroo-calculator.vercel.app',
        'https://buckaroo-calculator.vercel.app',
    ];

    // Check if the incoming request origin is allowed
    if (isset($_SERVER['HTTPS_ORIGIN']) && in_array($_SERVER['HTTPS_ORIGIN'], $allowedOrigins)) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTPS_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // Cache preflight for 1 day
    }

    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        if (isset($_SERVER['HTTPS_ACCESS_CONTROL_REQUEST_METHOD'])) {
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        }
        if (isset($_SERVER['HTTPS_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header("Access-Control-Allow-Headers: {$_SERVER['HTTPS_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }
        exit(0);
    }
}
?>
