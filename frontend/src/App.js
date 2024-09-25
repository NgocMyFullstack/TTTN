import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOutSite from "./layouts/LayoutSite";
import AppRoute from "./router";
import LayoutAdmin from "./layouts/LayoutAdmin";
import { CartProvider } from "./pages/frontend/home/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOutSite />}>
            {AppRoute.RouteSite.map((route, index) => {
              const Page = route.component;
              return <Route path={route.path} key={index} element={<Page />} />;
            })}
          </Route>
          <Route path="/admin/" element={<LayoutAdmin />}>
            {AppRoute.RouteAdmin.map((route, index) => {
              const Page = route.component;
              return <Route path={route.path} key={index} element={<Page />} />;
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
