import React, { useState, useEffect } from "react";
import QRcode from "../home/QRcode";
import UserService from "../../../services/UserService";
import OrderService from "../../../services/OrderService";
const Checkout = ({
  cartItems,
  urlImage,
  handleQuantityChange,
  handleRemoveFromCart,
}) => {
  const [localCartItems, setLocalCartItems] = useState(cartItems || []);
  const [user, setUser] = useState();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [savedUserId, setSavedUserId] = useState(null); // State to store saved userId
  const localUrlImage = urlImage || "yourDefaultImageUrl";

  const localHandleQuantityChange = (item, quantity) => {
    const updatedCartItems = [...localCartItems];
    const index = updatedCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (index !== -1) {
      updatedCartItems[index] = { ...updatedCartItems[index], qty: quantity };
      setLocalCartItems(updatedCartItems);
      handleQuantityChange(updatedCartItems);
    }
  };

  const localHandleRemoveFromCart = (item) => {
    const updatedCartItems = localCartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setLocalCartItems(updatedCartItems);
    handleRemoveFromCart(updatedCartItems);
  };

  const calculateTotal = (cartItems) => {
    if (cartItems && cartItems.length > 0) {
      return cartItems
        .reduce(
          (total, item) =>
            total + (item.qty && item.price ? item.price * item.qty : 0),
          0
        )
        .toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    } else {
      return "0";
    }
  };

  const showBankInfo = (value) => {
    const elementBank = document.querySelector(".bankinfo");
    if (value === 1) {
      elementBank.style.display = "none";
    } else {
      elementBank.style.display = "block";
    }
  };

  const [deliveryGender, setDeliveryGender] = useState("");
  const handleGenderChange = (e) => {
    setDeliveryGender(e.target.value);
  };

  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [note, setNote] = useState("");

  var userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await UserService.show(userId);
        setUser(result.user);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    // Assuming you have fetched or generated username
    const username = "example_username"; // Replace with actual logic to fetch or generate username

    const formData = new FormData();
    // formData.append("roles", "user"); // Ví dụ: Gán giá trị 'user' cho roles
    formData.append("user_id", user.id);
    formData.append("delivery_gender", deliveryGender);
    formData.append("delivery_name", deliveryName);
    formData.append("delivery_email", user.email); // Assuming user's email is fetched from API
    formData.append("delivery_phone", deliveryPhone);
    formData.append("delivery_address", deliveryAddress);
    formData.append("note", note);
    formData.append("username", username); // Append username here

    try {
      // Store user data
      const result = await OrderService.store(formData);
      alert(result.message);
      setSavedUserId(result.user.id); // Update savedUserId with user ID after storing data

      // Save order with user ID
      // const orderData = {
      //   userId: result.user.id, // Assuming result.user.id is the user ID from the response
      //   items: localCartItems, // Assuming localCartItems contains the items to be ordered
      //   total: calculateTotal(localCartItems), // Assuming calculateTotal calculates the order total
      //   status: "pending", // Example status
      // };

      // // Call OrderService to save the order
      // const orderResult = await OrderService.saveOrder(orderData);
      // console.log("Order saved:", orderResult);

      // Optionally, you can reset form fields after successful submission
      setDeliveryName("");
      setDeliveryPhone("");
      setDeliveryAddress("");
      setNote("");

      // Display success message
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error storing user data:", error.message);
    }
  };

  const provinces = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Bình Dương",
    "Đồng Nai",
    "Khánh Hòa",
    "Lâm Đồng",
    "Quảng Ninh",
    "Thừa Thiên Huế",
    "Bà Rịa - Vũng Tàu",
  ];
  const districtsData = {
    "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Tây Hồ", "Long Biên"],
    "Hồ Chí Minh": ["Quận 1", "Quận 2", "Quận 3", "Quận 4"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Ngũ Hành Sơn", "Cẩm Lệ"],
    "Hải Phòng": ["Hồng Bàng", "Lê Chân", "Ngô Quyền", "Kiến An"],
    "Cần Thơ": ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn"],
    Huế: ["TP Huế", "Hương Trà", "Hương Thủy", "Phú Vang"],
    "Nha Trang": ["TP Nha Trang", "Diên Khánh", "Cam Lâm", "Vạn Ninh"],
    "Đồng Nai": ["Biên Hòa", "Long Khánh", "Trảng Bom", "Long Thành"],
    "Bình Dương": ["Thủ Dầu Một", "Dĩ An", "Thuận An", "Bến Cát"],
    "Quảng Ninh": ["Hạ Long", "Cẩm Phả", "Uông Bí", "Móng Cái"],
    "Thanh Hóa": ["TP Thanh Hóa", "Bỉm Sơn", "Sầm Sơn", "Quảng Xương"],
    "Nghệ An": ["Vinh", "Cửa Lò", "Thái Hòa", "Diễn Châu"],
    "Hà Tĩnh": ["TP Hà Tĩnh", "Hồng Lĩnh", "Kỳ Anh", "Cẩm Xuyên"],
    "Khánh Hòa": ["Nha Trang", "Cam Ranh", "Ninh Hòa", "Vạn Ninh"],
    "Kiên Giang": ["Rạch Giá", "Hà Tiên", "Phú Quốc", "Hòn Đất"],
    "Thái Nguyên": ["TP Thái Nguyên", "Sông Công", "Phổ Yên", "Đại Từ"],
    "Lâm Đồng": ["Đà Lạt", "Bảo Lộc", "Di Linh", "Đức Trọng"],
    "Bắc Ninh": ["TP Bắc Ninh", "Từ Sơn", "Quế Võ", "Yên Phong"],
    "Phú Thọ": ["Việt Trì", "Phú Thọ", "Lâm Thao", "Tam Nông"],
    // ... Thêm dữ liệu tương tự cho các tỉnh thành khác
  };
  const wardsData = {
    "Ba Đình": ["Phường 1", "Phường 2", "Phường 3"],
    "Quận 1": ["Phường A", "Phường B", "Phường C"],
    // ... Thêm dữ liệu tương tự cho các quận huyện khác
  };

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setSelectedProvince(province);
    setDistricts(districtsData[province] || []);
    setSelectedDistrict("");
    setWards([]);
  };

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    setWards(wardsData[district] || []);
  };
  return (
    <>
      <section className="bg-light">
        <div className="container">
          <nav
            style={{ "--bs-breadcrumb-divider": ">" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb py-2 my-0">
              <li className="breadcrumb-item">
                <a className="text-main" href="index.html">
                  Trang chủ
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Thanh toán
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="hdl-maincontent py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="fs-5 text-main">Thông tin giao hàng</h2>
              <p>
                Bạn có tài khoản chưa? <a href="login.html">Đăng nhập</a>
              </p>
              <div className="mb-3">
                <label htmlFor="name">Họ tên</label>
                <input
                  type="text"
                  name="delivery_name"
                  id="delivery_name"
                  className="form-control"
                  placeholder="Nhập tên người nhận hàng"
                  value={deliveryName}
                  onChange={(e) => setDeliveryName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="delivery_phone">Điện thoại</label>
                <input
                  type="text"
                  name="delivery_phone"
                  id="delivery_phone"
                  className="form-control"
                  placeholder="Nhập số điện thoại"
                  value={deliveryPhone}
                  onChange={(e) => setDeliveryPhone(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <label htmlFor="delivery_gender" className="form-label">
                  Giới tính
                </label>
                <select
                  className="form-select"
                  id="delivery_gender"
                  value={deliveryGender}
                  onChange={handleGenderChange}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div> */}
              <div className="mb-3">
                <label htmlFor="note">Ghi chú</label>
                <input
                  type="text"
                  name="note"
                  id="note"
                  className="form-control"
                  placeholder="Nhập ghi chú (ví dụ: Giao hàng trước 17h)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="delivery_gender">Giới tính</label>
                <select
                  className="form-select"
                  id="delivery_gender"
                  value={deliveryGender}
                  onChange={handleGenderChange}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div>
              <div className="card">
                <div className="card-header text-main">Địa chỉ nhận hàng</div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="address">Địa chỉ</label>
                    <input
                      type="text"
                      name="delivery_address"
                      id="delivery_address"
                      className="form-control"
                      placeholder="Nhập địa chỉ"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <select
                        name="tinhtp"
                        id="tinhtp"
                        className="form-control"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                      >
                        <option value="">Chọn Tỉnh/TP</option>
                        {provinces.map((province, index) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-4">
                      <select
                        name="quanhuyen"
                        id="quanhuyen"
                        className="form-control"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                      >
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map((district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-4">
                      <select
                        name="phuongxa"
                        id="phuongxa"
                        className="form-control"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                      >
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map((ward, index) => (
                          <option key={index} value={ward}>
                            {ward}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="fs-6 text-main mt-4">Phương thức thanh toán</h4>
              <div className="thanhtoan mb-4">
                <div className="p-4 border">
                  <input
                    name="typecheckout"
                    onChange={() => showBankInfo(1)}
                    type="radio"
                    value="1"
                    id="check1"
                  />
                  <label htmlFor="check1">Thanh toán khi giao hàng</label>
                </div>
                <div className="p-4 border">
                  <input
                    name="typecheckout"
                    onChange={() => showBankInfo(2)}
                    type="radio"
                    value="2"
                    id="check2"
                  />
                  <label htmlFor="check2">Chuyển khoản qua ngân hàng</label>
                </div>
                <div className="p-4 border bankinfo">
                  <p>Ngân Hàng MB Bank </p>
                  <p>STK: 2044111092003</p>
                  <p>Chủ tài khoản: Trần Ngọc Mỹ</p>
                  <QRcode />
                </div>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-main px-4"
                  onClick={handleConfirmOrder}
                >
                  XÁC NHẬN
                </button>
              </div>

              {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                  Đặt hàng thành công!
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Checkout;
