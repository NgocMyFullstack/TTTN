import React, { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import Menu from "./Menu";
import { useParams } from "react-router-dom";
import { urlImage } from "../../../config";
import Loading from "../../../components/Loading";
import LoadingSpinner from "../../../LoadingSpinner";
import { useCart } from "./CartContext";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1); // State để lưu giá trị số lượng
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductService.index();
        console.log("🚀 ~ file: ProductDetail.jsx ~ result:", result);
        setProducts(result.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.show(id);
        console.log(
          "🚀 ~ file: ProductDetail.jsx:16 ~ fetchProduct ~ response:",
          response
        );
        setProduct(response.product);
        setPost(response.product);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };
    fetchProduct();
  }, [id]);

  const { addToCart, cartItems } = useCart();
  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    const productcart = {
      id: post.id,
      name: post.name,
      price: post.price,
      qty: qty,
      img: post.image,
      userId: userId, // Add userId to the productcart object
    };

    addToCart(productcart);
  };
  console.log("product", cartItems);

  return (
    <div>
      <Menu />
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="bg-light">
            <div className="container">
              <nav
                style={{ "--bsBreadcrumbDivider": '" > "' }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb py-2 my-0">
                  <li className="breadcrumb-item">
                    <a className="text-main" href="http://localhost:3000/">
                      Trang chủ
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Chi tiết sản phẩm
                  </li>
                </ol>
              </nav>
            </div>
          </section>

          <section className="hdl-maincontent py-2">
            <div className="container">
              {/*  */}
              <div className="row">
                <div className="col-md-6">
                  <div className="image">
                    <img
                      id="productimage"
                      className="img-fluid w-100"
                      src={urlImage + "product/" + post.image}
                      alt=""
                    />
                  </div>

                  <div className="list-image mt-3"></div>
                </div>

                <div className="col-md-6">
                  <h1 className="text-main">{post.name}</h1>
                  <h3 className="fs-5"> {post.detail}</h3>
                  <div className="row">
                    <h2 className="text-main fs-4 pt-4">Chi tiết sản phẩm</h2>
                    <p>{post.description}</p>
                  </div>
                  <h2 className="text-main py-4">
                    {post.price
                      ? post.price.toLocaleString() + "đ"
                      : "Giá không khả dụng"}
                  </h2>

                  <div className="mb-3 product-size">
                    <input
                      id="sizexxl"
                      type="radio"
                      className="d-none"
                      defaultValue="xxl"
                      name="size"
                    />
                    <label htmlFor="sizexxl" className="bg-info p-2">
                      XXX
                    </label>
                    <input
                      id="sizexl"
                      type="radio"
                      className="d-none"
                      defaultValue="xl"
                      name="size"
                    />
                    <label htmlFor="sizexl" className="bg-info p-2 px-3">
                      XL
                    </label>
                    <input
                      id="sizel"
                      type="radio"
                      className="d-none"
                      defaultValue="xl"
                      name="size"
                    />
                    <label htmlFor="sizel" className="bg-primary p-2 px-3">
                      M
                    </label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor>Số lượng</label>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)} // Cập nhật state khi giá trị input thay đổi
                      name="qty"
                      className="form-control"
                      style={{ width: 200 }}
                    />
                  </div>
                  <div className="mb-3">
                    <a
                      className="btn btn-main"
                      href="checkout.html"
                      style={{ backgroundColor: "#E74C3C" }}
                    >
                      Mua ngay
                    </a>
                    <button
                      className="btn btn-main"
                      style={{ backgroundColor: "#F39C12" }}
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>

              {/*  */}

              {/* Sản Phẩm Khác */}
              <div className="row">
                <h2 className="text-main fs-4 pt-4">Sản phẩm khác</h2>
                <div className="product-category mt-3">
                  <div className="row product-list">
                    {products.map((products) => (
                      <div className="col-6 col-md-3 mb-4" key={products.id}>
                        <div className="product-item border">
                          <div className="product-item-image">
                            <a href={`${products.id}`}>
                              <img
                                src={urlImage + "product/" + products.image}
                                className="img-fluid"
                                alt={products.image}
                                id="img1"
                                style={{ width: "400px", height: "400px" }}
                              />
                              <img
                                className="img-fluid"
                                src={urlImage + "product/" + products.image}
                                alt={products.image}
                                id="img2"
                                style={{ width: "400px", height: "400px" }}
                              />
                            </a>
                          </div>
                          <h2 className="product-item-name text-main text-center fs-5 py-1">
                            <a href={`${products.id}`}>{products.name}</a>
                          </h2>
                          <h3 className="product-item-price fs-6 p-2 d-flex">
                            <div className="flex-fill">
                              <del>{products.originalPrice}</del>
                            </div>
                            <div className="flex-fill text-end text-main">
                              {products.price.toLocaleString()}đ
                            </div>
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
