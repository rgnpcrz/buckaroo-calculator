import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [inputError, setInputError] = useState(false);
  const { getAccessTokenSilently, user } = useAuth0();
  const apiUri = process.env.REACT_APP_BACKEND_API;

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("calculationHistory"));
    if (storedHistory) {
      setHistory(storedHistory.reverse());
    }
  }, []);

  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setExpression(e.target.value);
    setInputError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidExpression = /^[0-9\(\)\+\-\*\/\. ]+$/.test(expression);

    if (isValidExpression) {
      try {
        const response = await fetch("https://buckaroo.pcrz.xyz/api/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ expression }),
        });

        if (response.ok) {
          const data = await response.json();

          if (data.hasOwnProperty("expression") && data.hasOwnProperty("result")) {
            setResult(data.result);

            const newCalculation = { expression: data.expression, result: data.result };
            const updatedHistory = [...history, newCalculation].reverse();
            setHistory(updatedHistory);

            localStorage.setItem("calculationHistory", JSON.stringify(updatedHistory));
          } else {
            console.error("Server did not return the expected data format.");
            setInputError(true);
          }
        } else {
          console.error("Server error:", response.status);
          setInputError(true);
        }
      } catch (error) {
        console.error("Error:", error);
        setInputError(true);
      }
    } else {
      setInputError(true);
      console.error("Invalid expression. Please enter a valid mathematical expression.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={"expression-input-container " + (inputError ? "red-border" : "")}>
          <input className="expression-input " type="text" value={expression} placeholder="Type math expression here" onChange={handleChange} />
          <button className="button" type="submit">
            Enter
          </button>
        </div>
      </form>
      <div className="result ">
        <div className="result-container">
          <p className="">{result ? result : "Result"}</p>
        </div>
        <div className="history">
          <div>
            {history.map((calculation, index) => (
              <div className=" result-history" key={index}>
                <div className="expression">{calculation.expression}</div> <div> {calculation.result}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
