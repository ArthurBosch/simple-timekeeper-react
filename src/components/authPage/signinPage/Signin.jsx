import "./signin.scss";

const SignIn = (props) => {
  return (
    <div className="signIn-page">
      <div className="signIn-container">
        <div className="signIn-h1">
          <h1>Welcome Back!</h1>
        </div>
        <div className="signIn-input-container">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
        </div>
        <div className="button-container">
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
