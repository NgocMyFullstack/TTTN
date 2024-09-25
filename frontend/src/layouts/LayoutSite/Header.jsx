import React, { useEffect, useState } from "react";
import { useCart } from "../../pages/frontend/home/CartContext";
import Search from "../../pages/frontend/home/Search";
import axios from "axios";

const Header = () => {
  const { cartItems, clearCart, updateQuantity, removeFromCart } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/user"); // Thay đổi thành endpoint lấy thông tin người dùng
      if (response.data.status) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout"); // Thay đổi thành endpoint logout
      if (response.data.status) {
        setUser(null); // Xóa thông tin người dùng khỏi state
        localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage nếu có sử dụng
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <section className="hdl-header1">
      <div className="container">
        <div className="row">
          <div className="col-6 col-sm-6 col-md-2 py-1">
            <a href="http://localhost:3000/">
              <img
                style={{ width: "100%", height: "110px" }}
                src={require("../../assets/logooooo.png")}
                className="img-fluid"
                alt="Logo"
              />
            </a>
          </div>
          <Search></Search>
          <div className="col-12 col-sm-12 d-none d-md-block col-md-4 text-center py-2">
            <div className="call-login--register border-bottom">
              <ul className="nav nav-fills py-0 my-0">
                <li className="nav-item">
                  <a className="nav-link" href="/login/">
                    <i className="fa fa-phone-square" aria-hidden="true" />
                    -0379367005-
                  </a>
                </li>
                {user ? (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/profile/">
                        {user.name}
                      </a>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/loginuser/">
                        Đăng nhập
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/register/">
                        Đăng ký
                      </a>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="http://localhost:3000/post_page"
                  >
                    Shop Poil
                  </a>
                </li>
              </ul>
            </div>
            <div className="fs-6 py-2">
              ĐỔI TRẢ HÀNG HOẶC HOÀN TIỀN{" "}
              <span className="text-main">TRONG 6 NGÀY</span>
            </div>
          </div>
          <div className="col-6 col-sm-6 col-md-1 text-end py-4 py-md-2">
            <a href="http://localhost:3000/cart/">
              <div className="box-cart float-end">
                <i className="fa fa-shopping-bag" aria-hidden="true" />
                <span>{cartItems.length}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
