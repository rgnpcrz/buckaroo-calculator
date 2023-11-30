<?php

require_once('classes/CalculationInterface.php');
require_once('classes/MathCalculator.php');
require_once('classes/RequestHandler.php');
require_once('cors.php');

handleCORS();

$calculator = new MathCalculator();
// $auth0Handler = new Auth0Handler('buckaroo-calculator.eu.auth0.com', 'bN9fHpzupH84aGTlzIYf3NjVoxuKQxiR', 'c5H1VIXmnMs9ULrN3CxHuntaqy-ym9kewqX3eFn5HOgz4xKEfCUgKO63NrEFe7lL');
$secretKey = 'lT_8YqD97BkmXVY0Qk43y_XnCMIyQde5hMOljZeX5EhPD0zUdb6wZ9USg4iy4w-P'; // Replace with your secret key

$requestHandler = new RequestHandler($calculator);
$requestHandler->handleRequest($_SERVER['HTTP_AUTHORIZATION']);


?>
