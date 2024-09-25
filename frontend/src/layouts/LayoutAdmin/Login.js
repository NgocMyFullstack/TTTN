import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      // In a real-world scenario, you would make an API request here to authenticate against a backend
      // For the sake of this example, we'll hardcode a set of valid credentials
      const validUsername = "admin123";
      const validPassword = "123123";

      if (username === validUsername && password === validPassword) {
        setLoginStatus(true);
        console.log("Login successful");

        // Redirect to the new page upon successful login
        navigate("/dashboard"); // Change "/dashboard" to the desired route
      } else {
        setLoginStatus(false);
        console.error("Login failed");
      }
    } catch (error) {
      setLoginStatus(false);
      console.error("Error during login:", error);
    }
  };

  const simulateLogin = async () => {
    // Simulate login with credentials: admin123, password: 123123
    setUsername("admin123");
    setPassword("123123");
    await handleLogin();
  };

  return (
    <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
      <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 100 }}>
        <div className="card-body">
          <h4 className="card-title mb-4">Sign in</h4>
          <form>
            <a
              href="https://m.facebook.com/v2.3/dialog/oauth?app_id=778119152607480&auth_type=&cbt=1691565867152&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df8370772a1be34%26domain%3Dpops.vn%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fpops.vn%252Ff2b87f18b6f8fd%26relation%3Dopener&client_id=778119152607480&display=touch&domain=pops.vn&e2e=%7B%7D&fallback_redirect_uri=https%3A%2F%2Fpops.vn%2Fauth%2Fsignin-signup%2Fsignin&locale=en_US&logger_id=f26d7ef68b2fefc&origin=2&redirect_uri=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df1ee4cd7f6e0e1%26domain%3Dpops.vn%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fpops.vn%252Ff2b87f18b6f8fd%26relation%3Dopener%26frame%3Df150aacee5168a8&response_type=token%2Csigned_request%2Cgraph_domain&return_scopes=false&scope=public_profile%2Cemail&sdk=joey&version=v2.3#"
              className="btn btn-facebook btn-block mb-2"
            >
              <i className="fab fa-facebook-f" /> &nbsp; Sign in with Facebook
            </a>
            <a
              href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?redirect_uri=storagerelay://https/pops.vn?id=auth760517&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm&include_granted_scopes=true&client_id=940244538457-rft69s5gtm5ssifr3hh0rlo1v2t7j3pa.apps.googleusercontent.com&ss_domain=https://pops.vn&prompt&fetch_basic_profile=true&gsiwebsdk=2&service=lso&o2v=1&flowName=GeneralOAuthFlow"
              className="btn btn-google btn-block mb-4"
            >
              <i className="fab fa-google" /> &nbsp; Sign in with Google
            </a>
            <div className="form-group">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <a href="#" className="float-right">
                Forgot password?
              </a>
              <label className="float-left custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  defaultChecked
                />{" "}
                <div className="custom-control-label"> Remember </div>{" "}
              </label>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={simulateLogin}
            >
              Login
            </button>
            <p
              className={`text-center mt-4 ${
                loginStatus === true ? "text-success" : "text-danger"
              }`}
            >
              {loginStatus
                ? "Login successful"
                : loginStatus === false && "Login failed"}
            </p>
          </form>
        </div>
      </div>
      <p className="text-center mt-4">
        Don't have an account? <a href="/register">Sign up</a>
      </p>
      <br />
      <br />
    </section>
  );
};

export default Login;
