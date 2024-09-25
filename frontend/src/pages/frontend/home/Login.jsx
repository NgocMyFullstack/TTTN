import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const result = await UserService.login({ username, password });
      console.log(result);

      // Handle successful login
      if (result.status) {
        setMessage("Bạn đã đăng nhập thành công!");
        setIsLoggedIn(true);
        setLoggedInUser(username); // Save the logged-in username

        // Store userId in localStorage
        localStorage.setItem("userId", result.userId);

        // Redirect to the home page (replace "/home" with your home page route)
        navigate("/");
      } else {
        // Handle login failure
        setMessage(
          "Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login failure
      setMessage(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu."
      );
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setUsername("");
    setPassword("");
    setMessage("Bạn đã đăng xuất.");

    // Remove userId from localStorage
    localStorage.removeItem("userId");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <section className="hdl-maincontent py-2">
      {isLoggedIn ? (
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <p>Xin chào, {loggedInUser}!</p>
              <button
                onClick={handleLogout}
                className="btn btn-main btn-danger"
              >
                Đăng xuất
              </button>
              <p className="text-success">{message}</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} name="logincustomer">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <p>
                  Để gửi bình luận, liên hệ hay để mua hàng cần phải có tài
                  khoản
                </p>
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="username" className="text-main">
                    Tên tài khoản (*)
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    placeholder="Nhập tài khoản đăng nhập"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="text-main">
                    Mật khẩu (*)
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-main btn-success"
                    name="LOGIN"
                  >
                    Đăng nhập
                  </button>
                </div>
                <p className={message ? "text-success" : "text-danger"}>
                  {message}
                </p>
                <p>
                  <u className="text-main">Chú ý</u>: (*) Thông tin bắt buộc
                  phải nhập
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
