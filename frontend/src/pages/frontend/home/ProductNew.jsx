import React, { useEffect, useState } from "react";
import ProductServie from "../../../services/ProductService";
import ProductService from "../../../services/ProductService";

import ProductItem from "../../../components/ProductItem";
import Loading from "../../../components/Loading";
import { urlImage } from "../../../config";
import ProductBoy from "./ProductBoy";
import ProductBaby from "./ProductBaby";
import ProductSport from "./ProductSport";

export default function ProductNew() {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  // Sản Phẩm mới
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductServie.productnew(6);
        console.log("🚀 ~ file: ProductDetail.jsx ~ result:", result);
        setProduct(result.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Removed 'reload' from the dependency array
  // Lấy Nam Nữ

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductService.index();
        console.log("🚀 ~ file: ProductList.jsx ~ result:", result);
        // Lọc những sản phẩm có category_id bằng 2
        const femaleProducts = result.products.filter(
          (product) => product.category_id === 2
        );
        // Lấy ra 6 sản phẩm đầu tiên
        const limitedProducts = femaleProducts.slice(0, 6);
        console.log(
          "🚀 ~ file: ProductList.jsx ~ limitedProducts:",
          limitedProducts
        );
        setProducts(limitedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Removed 'reload' from the dependency array

  return (
    <div>
      <div className="row">
        <div class="col-md-3" style={{ marginTop: "50px" }}>
          <div class="category-title bg-main">
            <h1 class="fs-5 py-3 text-center text-uppercase">Sản Phẩm mới</h1>
            <img
              className="img-fluid d-none d-md-block"
              src={require("../../../assets/new.jpg")}
              alt="category.jpg"
              style={{ width: "900px", height: "800px" }}
            />
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div class="col-md-9" style={{ marginTop: "50px" }}>
              <div class="row product-list">
                {product.map((product, index) => {
                  return (
                    <div className="col-5 col-md-4 mb-4" key={index}>
                      <ProductItem product={product} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        <div class="col-md-3" style={{ marginTop: "50px" }}>
          <div class="category-title bg-main">
            <h1 class="fs-5 py-3 text-center text-uppercase">Thời trang Nam</h1>
            <img
              className="img-fluid d-none d-md-block"
              src={require("../../../assets/category/thoi-trang-nam.png")}
              alt="category.jpg"
            />
          </div>
        </div>
        <ProductBoy></ProductBoy>
        <div className="product-category mt-3">
          <div className="row">
            <div className="col-md-3" style={{ marginTop: "50px" }}>
              <div className="category-title bg-main">
                <h3 className="fs-5 py-3 text-center text-uppercase">
                  THỜI TRANG NỮ
                </h3>
                <img
                  className="img-fluid d-none d-md-block"
                  src={require("../../../assets/category/thoi-trang-nu.png")}
                  alt=""
                />
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div class="col-md-9" style={{ marginTop: "50px" }}>
                  <div class="row product-list">
                    {products.map((product, index) => {
                      return (
                        <div className="col-5 col-md-4 mb-4" key={index}>
                          <div className="product-item border">
                            <div className="product-item-image">
                              <a href={`product_detail/${product.id}`}>
                                <img
                                  style={{ width: "350px", height: "350px" }}
                                  src={urlImage + "product/" + product.image}
                                  className="img-fluid"
                                  alt=""
                                  id="img1"
                                />
                                <img
                                  style={{ width: "350px", height: "350px" }}
                                  className="img-fluid"
                                  src={urlImage + "product/" + product.image}
                                  alt=""
                                  id="img2"
                                />
                              </a>
                            </div>
                            <h2 className="product-item-name text-main text-center fs-5 py-1">
                              <a href="product_detail.html">{product.name}</a>
                            </h2>
                            <h3 className="product-item-price">
                              <div style={{ textAlign: "center" }}>
                                {new Intl.NumberFormat().format(product.price)}{" "}
                                đ
                              </div>
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="product-category mt-3">
          <div className="row">
            <div className="col-md-3" style={{ marginTop: "50px" }}>
              <div className="category-title bg-main">
                <h3 className="fs-5 py-3 text-center text-uppercase">
                  THỜI TRANG TRẺ EM
                </h3>
                <img
                  className="img-fluid d-none d-md-block"
                  src={require("../../../assets/category/thoi-trang-tre-em.png")}
                  alt=""
                />
              </div>
            </div>
            <ProductBaby></ProductBaby>
          </div>
        </div>
        <div className="product-category mt-3">
          <div className="row">
            <div className="col-md-3" style={{ marginTop: "50px" }}>
              <div className="category-title bg-main">
                <h3 className="fs-5 py-3 text-center text-uppercase">
                  THỜI TRANG THỂ THAO
                </h3>
                <img
                  className="img-fluid d-none d-md-block"
                  src={require("../../../assets/category/thoi-trang-the-thao.png")}
                  alt=""
                />
              </div>
            </div>
            <ProductSport></ProductSport>
          </div>
        </div>
      </div>
    </div>
  );
}
