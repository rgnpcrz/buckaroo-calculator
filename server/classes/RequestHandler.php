<?php

class RequestHandler {
    private $calculator;

    public function __construct(CalculationInterface $calculator) {
        $this->calculator = $calculator;
    }

    public function handleRequest($accessToken) {

        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/calculate') {
            if (isset($data['expression'])) {
                $expression = $data['expression'];

                $calculation = $this->calculator->calculate($expression);

                header('Content-Type: application/json');
                echo json_encode($calculation);
                exit;
            } else {
                http_response_code(400); // Bad Request
                echo json_encode(['error' => 'Expression not provided']);
                exit;
            }
        } else {
            http_response_code(404); // Not Found
            echo "404 - Endpoint Not Found";
        }


        
    }
}

?>
