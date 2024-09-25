import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { urlImage } from "../../../config";

export default function Cart() {
  const { cartItems, clearCart, updateQuantity, removeFromCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Tính toán tổng tiền khi có sự thay đổi về giá thành hoặc số lượng
    const newTotalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    setTotalAmount(newTotalAmount);
    // Lưu tổng tiền vào localStorage
    localStorage.setItem("totalAmount", newTotalAmount);
  }, [cartItems]);

  const handleQuantityChange = (item, newQuantity) => {
    updateQuantity(item, newQuantity);
  };

  const handleAddToCart = () => {
    clearCart();
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  return (
    <section className="hdl-maincontent py-2">
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr className="bg-dark">
              <th style={{ width: 30 }} className="text-center">
                STT
              </th>
              <th style={{ width: 100 }}>Hình</th>
              <th>Tên sản phẩm</th>
              <th className="text-center">Giá</th>
              <th style={{ width: 130 }} className="text-center">
                Số lượng
              </th>
              <th className="text-center">Thành tiền</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="text-center align-middle">{index + 1}</td>
                  <td>
                    <img
                      id="productimage"
                      className="img-fluid w-100"
                      src={urlImage + "product/" + item.img}
                      alt=""
                    />
                  </td>
                  <td className="align-middle">{item.name}</td>
                  <td className="text-center align-middle">
                    {item.price
                      ? item.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : "Giá không khả dụng"}
                  </td>
                  <td className="text-center align-middle">
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) =>
                          handleQuantityChange(item, parseInt(e.target.value))
                        }
                        className="form-control text-center"
                      />
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    {item.qty && item.price
                      ? (item.price * item.qty).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : "Thành tiền không khả dụng"}
                  </td>
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-sm btn-main"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <button className="btn btn-main" onClick={handleAddToCart}>
                  Clear
                </button>
                <a href="/checkout" className="btn btn-main">
                  Thanh toán
                </a>
              </td>
              <td colSpan={2} className="text-end">
                <strong>
                  Tổng tiền:{" "}
                  {totalAmount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
