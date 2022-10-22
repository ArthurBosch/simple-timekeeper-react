import "./auth.scss";
import SignIn from "./signinPage/Signin";
import SignUp from "./signupPage/SignUp";
import logo from "../../img/logofinal2.png";
import { useState } from "react";

const Auth = () => {
  const [signState, setSignState] = useState(true);
  return (
    <div className="auth-page">
      <div className="auth-header">
        <img src={logo} />
        <button
          onClick={() => {
            setSignState(!signState);
          }}
        >
          {signState ? "Create Account" : "Sign In"}
        </button>
      </div>
      {signState ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default Auth;
