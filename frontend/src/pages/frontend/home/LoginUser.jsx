import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";

export default function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // State để lưu thông tin người dùng đã đăng nhập
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kiểm tra xem localStorage có userId không
        const userId = localStorage.getItem("userId");
        if (userId) {
          // Nếu có userId, gọi API để lấy thông tin người dùng chi tiết
          const userDetail = await UserService.getUserById(userId);
          console.log("User detail from localStorage:", userDetail);
          if (userDetail.status) {
            // Cập nhật thông tin người dùng vào state từ localStorage
            setLoggedInUser(userDetail.user);
            setIsLoggedIn(true);
          } else {
            // Xử lý khi không lấy được thông tin người dùng
            setMessage(userDetail.message);
          }
        } else {
          // Nếu không có userId trong localStorage, chuyển hướng đến trang đăng nhập
          navigate("/login");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

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

      if (result.status === true) {
        // Nếu đăng nhập thành công, lưu thông tin người dùng vào state và hiển thị thông báo thành công
        setLoggedInUser(result.user);
        setMessage("Bạn đã đăng nhập thành công!");
        setIsLoggedIn(true);
        // Lưu userId vào localStorage
        localStorage.setItem("userId", result.user.id);
        // Redirect to the home page (replace "/" with your home page route)
        navigate("/");
      } else {
        // Nếu đăng nhập không thành công, hiển thị thông báo lỗi
        setMessage(
          "Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu."
      );
    }
  };

  const handleLogout = () => {
    // Xóa thông tin người dùng đã đăng nhập khi đăng xuất
    localStorage.removeItem("userId");
    setLoggedInUser(null);
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setMessage("Bạn đã đăng xuất.");
    // Chuyển hướng đến trang đăng nhập
    navigate("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // Định dạng ngày đăng ký tài khoản
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div>
        <section className="section-pagetop bg-gray">
          <div className="container">
            <h2 className="title-page">Tài khoản của bạn</h2>
          </div>
        </section>
        <section className="section-content padding-y">
          <div className="container">
            <div className="row">
              <aside className="col-md-3">
                <nav className="list-group">
                  <a className="list-group-item active" href="#">
                    Tổng quan vê tai khoản
                  </a>
                  <a className="list-group-item" href="/cart/">
                    Đơn hàng của tôi
                  </a>

                  <a
                    className="list-group-item"
                    href="/login/"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </a>
                </nav>
              </aside>
              <main className="col-md-9">
                <div className="row">
                  <div className="col-md-6">
                    <article className="box mb-4">
                      <img
                        src={require("../../../assets/images/avatars/avata_ngocmy.jpg")}
                        alt="Profile Image"
                        style={{ width: "300px", height: "300px" }} // Điều chỉnh chiều rộng và chiều cao tại đây
                      />
                      {loggedInUser && (
                        <>
                          <h3>Họ và tên: {loggedInUser.name}</h3>
                          <h6>Email: {loggedInUser.email}</h6>
                          <p>Phone: {loggedInUser.phone}</p>
                          <p>
                            Ngày đăng ký: {formatDate(loggedInUser.created_at)}
                          </p>
                        </>
                      )}
                    </article>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
