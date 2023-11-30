<?php

require_once('classes/CalculationInterface.php');
require_once('classes/MathCalculator.php');
require_once('classes/RequestHandler.php');
require_once('cors.php');
require_once('classes/AccessTokenVerifier.php');

handleCORS();

$calculator = new MathCalculator();
$AccessTokenVerifier = new AccessTokenVerifier(); // Instantiate your AccessTokenVerifier class here with the necessary parameters

$requestHandler = new RequestHandler($calculator, $AccessTokenVerifier);
$requestHandler->handleRequest($_SERVER['HTTP_AUTHORIZATION']);


?>
