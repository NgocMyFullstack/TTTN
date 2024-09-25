import ProductDetail from "../pages/frontend/home/ProductDetail";
import ProductAll from "../pages/frontend/home/ProductAll";
import Home from "../pages/frontend/home/index";
import Register from "../pages/frontend/home/Register";
import Login from "../pages/frontend/home/Login";
import LoginUser from "../pages/frontend/home/LoginUser";
import Contact from "../pages/frontend/home/Contact";
import PostPage from "../pages/frontend/home/Postpage";
import PostTopic from "../pages/frontend/home/PostTopic";
import Cart from "../pages/frontend/home/Cart";
import ProductMAN from "../pages/frontend/home/ProductMAN";
import ProductWomen from "../pages/frontend/home/ProductWomen";
import ProductCategory from "../pages/frontend/home/ProductCategory";
import Checkout from "../pages/frontend/home/Checkout";
import PostAll from "../pages/frontend/home/PostAll";
import QRcode from "../pages/frontend/home/QRcode";

const RouteSite = [
  { path: "/", component: Home },

  { path: "/register/", component: Register },
  { path: "/login/", component: Login },
  { path: "/loginuser/", component: LoginUser },
  { path: "/product_detail/:id", component: ProductDetail },
  { path: "/product_all/", component: ProductAll },
  { path: "/contact/", component: Contact },
  { path: "/post_page/", component: PostPage },
  { path: "/post_topic/", component: PostTopic },
  { path: "/cart/", component: Cart },
  { path: "/product_man/", component: ProductMAN },
  { path: "/product_women/", component: ProductWomen },
  { path: "/product_category/:id", component: ProductCategory },
  { path: "/checkout/", component: Checkout },
  { path: "/postall", component: PostAll },
  { path: "/qrcode", component: QRcode },
  {
    path: "/post_topic/:slug",
    component: PostTopic,
  },
];
export default RouteSite;
