import { useState } from "react";
import "./signup.scss";
import { asyncSignUp } from "../../../store-toolkit/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError } = useSelector((state) => state.userInfo);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    if (signUpData.name.length < 3) {
      return alert("Name is too short!");
    }

    if (signUpData.password.length < 5) {
      return alert("Password is too short!");
    }

    dispatch(asyncSignUp(signUpData));
    navigate("/createWorkplace");
  };
  return (
    <div className="signIn-page">
      <div className="signIn-container">
        <div className="signIn-h1">
          <h1>New to Timekeeper?</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp(e);
          }}
        >
          <div className="signIn-input-container">
            <input
              className={authError ? "input-error" : "auth-input"}
              type="text"
              placeholder="name"
              onChange={(e) => {
                setSignUpData({ ...signUpData, name: e.target.value });
              }}
            />
            <input
              className={authError ? "input-error" : "auth-input"}
              type="email"
              placeholder="email"
              autoComplete="on"
              onChange={(e) => {
                setSignUpData({ ...signUpData, email: e.target.value });
              }}
            />
            <input
              type="password"
              className={authError ? "input-error" : "auth-input"}
              placeholder="password"
              onChange={(e) => {
                setSignUpData({ ...signUpData, password: e.target.value });
              }}
            />
          </div>
          <div className="button-container">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
