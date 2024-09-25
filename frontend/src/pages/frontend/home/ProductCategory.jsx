import React, { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService";
import Menu from "./Menu";
import { urlImage } from "../../../config";
import Loading from "../../../components/Loading";
import ProductService from "../../../services/ProductService";

export default function ProductCategory() {
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(true);
  const [reload, setReLoad] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Hàm Lấy id
  const extractCategoryIdFromUrl = (url) => {
    const match = url.match(/\/product_category\/(\d+)$/);
    return match ? match[1] : null; // The extracted ID or null if not found
  };

  const extractBrandIdFromProduct = (product) => {
    return product.brand_id; // Adjust this based on the actual structure of your product object
  };

  // Hàm lấy ra sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = window.location.href;
        const categoryId = extractCategoryIdFromUrl(url);

        if (categoryId) {
          const result = await ProductService.index({ categoryId }); // Assuming your ProductService.index method supports passing categoryId
          console.log("🚀 ~ file: aaaaaaaaaaaaaaaaa.jsx ~ result:", result);

          if (result.products && result.products.length > 0) {
            // Lọc sản phẩm theo điều kiện categoryId bằng brandId
            const filteredProducts = result.products.filter(
              (product) => extractBrandIdFromProduct(product) == categoryId
            );

            console.log(
              "Products with the same categoryId and brandId:",
              filteredProducts
            );
            setProducts(filteredProducts);
          } else {
            console.log("No products found for the given category ID.");
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                    Tất cả sản phẩm
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
                    {products.map((product) => (
                      <div className="col-6 col-md-3 mb-4" key={product.id}>
                        <div className="product-item border">
                          <div className="product-item-image">
                            <a href={`/product_detail/${product.id}`}>
                              <img
                                src={urlImage + "product/" + product.image}
                                className="img-fluid"
                                alt={product.image}
                                id="img1"
                                style={{ width: "400px", height: "400px" }}
                              />
                              <img
                                className="img-fluid"
                                src={urlImage + "product/" + product.image}
                                alt={product.image}
                                id="img2"
                                style={{ width: "400px", height: "400px" }}
                              />
                            </a>
                          </div>
                          <h2 className="product-item-name text-main text-center fs-5 py-1">
                            <a href={`/product_detail/${product.id}`}>
                              {product.name}
                            </a>
                          </h2>
                          <h3 className="product-item-price fs-6 p-2 d-flex">
                            <div className="flex-fill">
                              <del>{product.originalPrice}</del>
                            </div>
                            <div className="flex-fill text-end text-main">
                              {product.price.toLocaleString()}đ
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
