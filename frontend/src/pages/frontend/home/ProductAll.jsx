import React, { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import Menu from "./Menu";
import { urlImage } from "../../../config";
import Loading from "../../../components/Loading";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductDetail() {
  const [inputPrice, setInputPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState(null);
  const [reload, setReload] = useState(false); // Thêm state reload
  const fetchData = async () => {
    try {
      const result = await ProductService.index1(currentPage);
      console.log("🚀 ~ file: ProductDetail.jsx ~ result:", result);
      setProducts(result.products.data);
      setCurrentPage(result.products.current_page);
      setLastPage(result.products.last_Page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, reload]);

  const handleFilter = async () => {
    try {
      const result = await ProductService.filterProducts({
        price: priceFilter, // Include the price filter
        // Other filters (category, brand, ...)
      });

      setProducts(result.products.data);
      setCurrentPage(result.products.current_page);
      setLastPage(result.products.last_page);
      setLoading(false);

      // Handle successful filtering, e.g., show an alert
      alert("Sản phẩm đã được lọc thành công!");

      // Update the reload state to refresh the product list
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error filtering products:", error.message);
      setLoading(false);

      // Handle errors during filtering, e.g., show an alert
      alert("Đã xảy ra lỗi khi lọc sản phẩm.");
    }
  };

  const handleFilterByPrice = () => {
    if (inputPrice !== "") {
      setPriceFilter(parseInt(inputPrice));
      handleFilter();
    }
  };

  const handleFilterByCategory = async () => {
    // Xử lý lọc theo danh mục
  };

  const handleFilterByBrand = async () => {
    // Xử lý lọc theo thương hiệu
  };

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
                {/* chức năng */}
                <ul className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white custom-dropdown-btn"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    --Chức năng--
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Nhập giá"
                          value={inputPrice}
                          onChange={(e) => setInputPrice(e.target.value)}
                        />
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => {
                            setPriceFilter(parseInt(inputPrice));
                            handleFilterByPrice();
                          }}
                        >
                          Lọc
                        </button>
                      </div>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-main"
                        href="#"
                        onClick={() => handleFilterByCategory()}
                      >
                        Danh mục
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-main"
                        href="#"
                        onClick={() => handleFilterByBrand()}
                      >
                        Thương hiệu
                      </a>
                    </li>
                    {/* Thêm các mục chức năng khác ở đây nếu cần */}
                  </ul>
                </ul>
                <div className="product-category mt-3">
                  <div className="row product-list">
                    {products.map((product) => (
                      <div className="col-6 col-md-3 mb-4" key={product.id}>
                        <div className="product-item border">
                          <div className="product-item-image">
                            <a href={`product_detail/${product.id}`}>
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
          <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    &lt;{" "}
                  </a>
                </li>
                {Array.from({ length: lastPage }, (_, i) => (
                  <li
                    className={`page-item ${
                      i + 1 === currentPage ? "active" : ""
                    }`}
                    key={i}
                  >
                    <a
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === lastPage ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    {" "}
                    &gt;
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
