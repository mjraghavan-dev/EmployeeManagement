import React, { useState } from "react";
import "./styles.css";
import SignInForm from "./login";
import SignUpForm from "./signup";

const Index = () => {
  const [type, setType] = useState("login");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signup" ? "right-panel-active" : "");
  return (
    <div className="AuthMain">
      <div className={containerClass} id="container">
        <SignUpForm handleOnClick={handleOnClick}/>
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="login"
                onClick={() => handleOnClick("login")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signup"
                onClick={() => handleOnClick("signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
