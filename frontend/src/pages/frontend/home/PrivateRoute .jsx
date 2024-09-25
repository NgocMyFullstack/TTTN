import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const userId = localStorage.getItem("userId");
  return userId ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
