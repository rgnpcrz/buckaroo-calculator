import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hooks
import { resolve } from "url";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const { getAccessTokenSilently, user } = useAuth0(); // Retrieve Auth0 access token

  const handleChange = (e) => {
    setExpression(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await getAccessTokenSilently(); // Get Auth0 access token
      console.log(accessToken);
      const response = await fetch("http://localhost:8000/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // Include JWT token in Authorization header
        },
        body: JSON.stringify({ expression }),
      });
      const data = await response.json();
      setResult(data.result);
      // setResult("Please check expression");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="expression-input-container">
          <input className="expression-input" type="text" value={expression} placeholder="Type math expresion here" onChange={handleChange} />
          <button className="button" type="submit">
            Enter
          </button>
        </div>
      </form>
      <div className="result">
        {/* <p>Result: {result}</p> */}
        <div className="result-container">
          <p className="">{result ? result : "Reslut"}</p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
