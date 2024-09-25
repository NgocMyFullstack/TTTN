import BrandEdit from "../pages/backend/brand/BrandEdit";
import BrandIndex from "../pages/backend/brand/BrandIndex";
import BrandShow from "../pages/backend/brand/BrandShow";
import BrandTrash from "../pages/backend/brand/BrandTrash";
//product
import ProductIndex from "../pages/backend/product/ProductIndex";
import blankpage from "../layouts/LayoutAdmin/blankpage";
import ProductCreate from "../pages/backend/product/ProductCreate";
import ProductEdit from "../pages/backend/product/ProductEdit";
import ProductShow from "../pages/backend/product/ProductShow";

//category
import CategoryIndex from "../pages/backend/category/CategoryIndex";
import CategoryEdit from "../pages/backend/category/CategoryEdit";
import CategoryShow from "../pages/backend/category/CategoryShow";
import CategoryTrash from "../pages/backend/category/CategoryTrash";
//banner
import BannerIndex from "../pages/backend/banner/BannerIndex";
import BannerShow from "../pages/backend/banner/BannerShow";
import BannerTrash from "../pages/backend/banner/BannerTrash";
import BannerEdit from "../pages/backend/banner/BannerEdit";
//Contact
import ContactIndex from "../pages/backend/contact/ContactIndex";
import ContactReply from "../pages/backend/contact/ContactReply";
import ContactShow from "../pages/backend/contact/ContactShow";
import ContactTrash from "../pages/backend/contact/ContactTrash";

//Customer
import CustomerIndex from "../pages/backend/customer/CustomerIndex";
import CustomerCreate from "../pages/backend/customer/CustomerCreate";
import CustomerEdit from "../pages/backend/customer/CustomerEdit";
import CustomerShow from "../pages/backend/customer/CustomerShow";
import CustomerTrash from "../pages/backend/customer/CustomerTrash";

//Menu
import MenuIndex from "../pages/backend/menu/MenuIndex";
import MenuEdit from "../pages/backend/menu/MenuEdit";
import MenuShow from "../pages/backend/menu/MenuShow";
import MenuTrash from "../pages/backend/menu/MenuTrash";

//Order
import OrderIndex from "../pages/backend/order/OrderIndex";
import OrderExport from "../pages/backend/order/OrderExport";
import OrderShow from "../pages/backend/order/OrderShow";
import OrderTrash from "../pages/backend/order/OrderTrash";

//PageIndex
import PageIndex from "../pages/backend/page/PageIndex";
import PageCreate from "../pages/backend/page/PageCreate";
import PageEdit from "../pages/backend/page/PageEdit";
import PageShow from "../pages/backend/page/PageShow";
import PageTrash from "../pages/backend/page/PageTrash";

//PostIndex
import PostIndex from "../pages/backend/post/PostIndex";
import PostCreate from "../pages/backend/post/PostCreate";
import PostEdit from "../pages/backend/post/PostEdit";
import PostShow from "../pages/backend/post/PostShow";
//TopicIndex
import TopicIndex from "../pages/backend/topic/TopicIndex";
import TopicEdit from "../pages/backend/topic/TopicEdit";
import TopicShow from "../pages/backend/topic/TopicShow";
import TopicTrash from "../pages/backend/topic/TopicTrash";

//users
import UserIndex from "../pages/backend/user/UserIndex";
import UserCreate from "../pages/backend/user/UserCreate";
import UserEdit from "../pages/backend/user/UserEdit";
import UserShow from "../pages/backend/user/UserShow";
import UserTrash from "../pages/backend/user/UserTrash";

//Config
import ConfigIndex from "../pages/backend/config/ConfigIndex";
// admin
import Login from "../layouts/LayoutAdmin/Login";
// import PostTrash from "./../pages/backend/post/PostTrash";
const RouteAdmin = [
  // loginadmin
  { path: "/admin/login", component: Login },

  // breand
  { path: "/admin/brand/index", component: BrandIndex },
  { path: "/admin/brand/edit/:id", component: BrandEdit },
  { path: "/admin/brand/show/:id", component: BrandShow },
  { path: "/admin/brand/trash", component: BrandTrash },
  //product
  { path: "/admin/product/index", component: ProductIndex },
  { path: "/admin/product/create", component: ProductCreate },
  { path: "/admin/product/edit/:id", component: ProductEdit },
  { path: "/admin/product/show/:id", component: ProductShow },

  //category
  { path: "/admin/category/index", component: CategoryIndex },
  { path: "/admin/category/edit/:id", component: CategoryEdit },
  { path: "/admin/category/show/:id", component: CategoryShow },
  { path: "/admin/category/trash", component: CategoryTrash },
  //banner
  { path: "/admin/banner/index", component: BannerIndex },
  { path: "/admin/banner/edit/:id", component: BannerEdit },
  { path: "/admin/banner/show/:id", component: BannerShow },
  { path: "/admin/banner/trash", component: BannerTrash },
  //contact
  { path: "/admin/contact/index", component: ContactIndex },
  { path: "/admin/contact/reply/:id", component: ContactReply },
  { path: "/admin/contact/show/:id", component: ContactShow },
  { path: "/admin/contact/trash", component: ContactTrash },

  //Customer

  { path: "/admin/customer/index", component: CustomerIndex },
  { path: "/admin/customer/create", component: CustomerCreate },
  { path: "/admin/customer/edit/:id", component: CustomerEdit },
  { path: "/admin/customer/show/:id", component: CustomerShow },
  { path: "/admin/customer/trash", component: CustomerTrash },

  /// menu
  { path: "/admin/menu/index", component: MenuIndex },
  { path: "/admin/menu/edit/:id", component: MenuEdit },
  { path: "/admin/menu/index", component: MenuIndex },
  { path: "/admin/menu/edit/:id", component: MenuEdit },
  { path: "/admin/menu/show/:id", component: MenuShow },
  { path: "/admin/menu/trash", component: MenuTrash },

  //Oder
  { path: "/admin/order/index", component: OrderIndex },
  { path: "/admin/orderExport/index", component: OrderExport },
  { path: "/admin/order/show/:id", component: OrderShow },
  { path: "/admin/order/trash/:id", component: OrderTrash },

  //page
  { path: "/admin/page/index", component: PageIndex },
  { path: "/admin/page/create", component: PageCreate },
  { path: "/admin/page/edit/:id", component: PageEdit },
  { path: "/admin/page/show/:id", component: PageShow },
  { path: "/admin/page/trash", component: PageTrash },

  //Post
  { path: "/admin/post/index", component: PostIndex },
  { path: "/admin/post/create", component: PostCreate },
  { path: "/admin/post/edit/:id", component: PostEdit },
  { path: "/admin/post/show/:id", component: PostShow },

  // topic
  { path: "/admin/topic/index", component: TopicIndex },
  { path: "/admin/topic/edit/:id", component: TopicEdit },
  { path: "/admin/topic/show/:id", component: TopicShow },
  { path: "/admin/topic/trash", component: TopicTrash },

  //users
  { path: "/admin/user/index", component: UserIndex },
  { path: "/admin/user/create", component: UserCreate },
  { path: "/admin/user/edit/:id", component: UserEdit },
  { path: "/admin/user/show/:id", component: UserShow },
  { path: "/admin/user/trash", component: UserTrash },

  //ConfigIndex
  { path: "/admin/config/index", component: ConfigIndex },
];

export default RouteAdmin;
