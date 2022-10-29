import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSingIn } from "../../../store-toolkit/userSlice";
import "./signin.scss";

const SignIn = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { authError } = useSelector((state) => state.userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncSingIn(user));
  };
  return (
    <div className="signIn-page">
      <div className="signIn-container">
        <div className="signIn-h1">
          <h1>Welcome Back!</h1>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="signIn-input-container">
            <input
              className={authError ? "input-error" : "auth-input"}
              type="email"
              placeholder="email"
              autoComplete="on"
              required
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
            <input
              className={authError ? "input-error" : "auth-input"}
              type="password"
              autoComplete="on"
              placeholder="password"
              required
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>
          <div className="button-container">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
