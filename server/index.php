<?php

require_once('classes/CalculationInterface.php');
require_once('classes/MathCalculator.php');
require_once('classes/RequestHandler.php');
require_once('cors.php');

handleCORS();

$calculator = new MathCalculator();

$requestHandler = new RequestHandler($calculator);
$requestHandler->handleRequest($_SERVER['HTTP_AUTHORIZATION']);


?>
