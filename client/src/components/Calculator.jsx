import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const { getAccessTokenSilently, user } = useAuth0();
  const apiUri = process.env.REACT_APP_BACKEND_API;

  const handleChange = (e) => {
    setExpression(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const accessToken = await getAccessTokenSilently(); // Get Auth0 access token
      const response = await fetch("https:/buckaroo.pcrz.xyz/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${accessToken}`, // Include JWT token in Authorization header
        },
        body: JSON.stringify({ expression }),
      });
      const data = await response.json();
      setResult(data.result);
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
        <div className="result-container">
          <p className="">{result ? result : "Reslut"}</p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
