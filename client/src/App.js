import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Calculator from "./components/Calculator";
function App() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  if (isLoading) {
    return (
      <div className="calculator-container">
        <div className="calculator">Loading ...</div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div className="calculator-container">
        <div className="calculator">
          <button className="button login-button" onClick={() => loginWithRedirect()}>
            Log In
          </button>
        </div>
      </div>
    );
  }
  if (isAuthenticated) {
    return (
      <div className="App calculator-container">
        <div className="calculator">
          <button className="button logout-button" onClick={() => logoutWithRedirect()}>
            Log Out
          </button>
          <h1>Calculator App</h1>
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
