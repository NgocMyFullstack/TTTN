import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const getUserId = () => localStorage.getItem("userId");

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const userId = getUserId();
    return storedCart.filter((item) => item.userId === userId);
  });

  useEffect(() => {
    const userId = getUserId();
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const userCartItems = updatedCart.filter((item) => item.userId === userId);
    setCartItems(userCartItems);
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const userId = getUserId();
    const filteredCart = storedCart.filter((item) => item.userId !== userId);
    localStorage.setItem(
      "cart",
      JSON.stringify([...filteredCart, ...cartItems])
    );
  }, [cartItems]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Nếu đã có, cập nhật số lượng
      updateQuantity(existingItem, existingItem.qty + item.qty);
    } else {
      // Nếu chưa có, thêm mới vào giỏ hàng
      setCartItems((prevItems) => [
        ...prevItems,
        { ...item, userId: getUserId() },
      ]);
    }
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== item.id)
    );
  };

  const updateQuantity = (item, newQuantity) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, qty: newQuantity };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
