import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Calculator from "./components/Calculator";
import Loading from "./components/Loading";
function App() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  if (isLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return (
      <>
        <div className="calculator-container">
          <div className="calculator">
            <img width={200} src="https://buckaroo-calculator.vercel.app/buckaroo.jpg"></img>
            <h3>Welcome to Calculator</h3>
            <button className="button login-button" onClick={() => loginWithRedirect()}>
              Log In
            </button>
          </div>
        </div>
      </>
    );
  }
  if (isAuthenticated) {
    return (
      <div className="App calculator-container ">
        <div className="calculator relative">
          <div className="icon">
            <img width={20} src="https://buckaroo-calculator.vercel.app/favicon-32x32.png"></img>
          </div>
          <div className="user-div">
            <div>{user.email}</div>
            <button className="button logout-button" onClick={() => logoutWithRedirect()}>
              Log Out
            </button>
          </div>
          <h1 className="title">Calculator App</h1>
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
