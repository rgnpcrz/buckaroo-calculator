<?php

class MathCalculator implements CalculationInterface {
    public function calculate($expression) {
        if (preg_match('/^[0-9\(\)\+\-\*\/\. ]+$/', $expression)) {
            try {
                $result = eval("return $expression;");
                return [
                    'expression' => $expression,
                    'result' => $result,
                ];
            } catch (Throwable $e) {
                return 'Error: ' . $e->getMessage();
            }
        } else {
            return 'Invalid expression';
        }
    }
}

?>
