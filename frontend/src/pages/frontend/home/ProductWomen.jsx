import React, { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import Menu from "./Menu";
import { urlImage } from "../../../config";
import Loading from "../../../components/Loading";

export default function ProductWomen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductService.index();
        console.log("🚀 ~ file: ProductList.jsx ~ result:", result);

        // Lọc những sản phẩm có category_id bằng 2
        const femaleProducts = result.products.filter(
          (product) => product.category_id === 2
        );

        console.log(
          "🚀 ~ file: ProductList.jsx ~ femaleProducts:",
          femaleProducts
        );

        setProducts(femaleProducts);
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
                    Thời trang Nữ
                  </li>
                </ol>
              </nav>
            </div>
          </section>
          <section className="hdl-maincontent py-2">
            <div className="container">
              <div className="row">
                <h2 className="text-main fs-4 pt-4">Tất Cả Sản Phẩm</h2>
                <div className="product-category mt-3">
                  <div className="row product-list">
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
                              <a href={`product_detail/${product.name}`}>
                                {product.name}
                              </a>
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
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
