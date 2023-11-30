import "./App.css";
import Calculator from "./Calculator";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  }
  if (isAuthenticated) {
    return (
      <div className="App">
        <button onClick={() => logoutWithRedirect()}>Log Out</button>
        <h1>Calculator App</h1>
        <Calculator />
      </div>
    );
  }
}

export default App;
