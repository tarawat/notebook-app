import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";
import Logo from "./notebook-logo.png";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_logo">
        <img
          className="App-logo"
          style={{ width: "300px", height: "300px" }}
          src={Logo}
          alt=""
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
