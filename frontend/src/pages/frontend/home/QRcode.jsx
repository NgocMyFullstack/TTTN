import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const ShoppingCart = () => {
  const [total, setTotal] = useState(0);
  const [qrCodeValue, setQRCodeValue] = useState("");

  const bankName = "MB Bank";
  const accountNumber = "2044111092003";

  useEffect(() => {
    // Lấy tổng tiền từ localStorage khi component được mount
    const storedTotalAmount = localStorage.getItem("totalAmount");
    if (storedTotalAmount) {
      setTotal(parseFloat(storedTotalAmount));
    }
  }, []);

  const generateQRCode = () => {
    // Tạo giá trị cho mã QR bao gồm tổng hóa đơn, tên ngân hàng và số tài khoản
    const qrValue = `Bank: ${bankName}\nAccount Number: ${accountNumber}\nTotal: đ${total.toLocaleString(
      "vi-VN"
    )}`;
    setQRCodeValue(qrValue);
  };

  return (
    <div>
      <p>Tổng giá: {total.toLocaleString("vi-VN")}VND</p>
      <button onClick={generateQRCode}>Mã QR</button>
      <div style={{ marginTop: "20px" }}>
        {qrCodeValue && <QRCode value={qrCodeValue} />}
      </div>
    </div>
  );
};

export default ShoppingCart;
