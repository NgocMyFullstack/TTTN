import React, { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import Loading from "../../../components/Loading";
import { urlImage } from "../../../config";

export default function ProductBoy() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductService.index();
        console.log("🚀 ~ file: ProductList.jsx ~ result:", result);
        // Lọc những sản phẩm có category_id bằng 2
        const femaleProducts = result.products.filter(
          (product) => product.category_id === 1
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
    <>
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
                        <a href={`product_detail/${product.name}`}>
                          {product.name}
                        </a>
                      </h2>
                      <h3 className="product-item-price">
                        <div style={{ textAlign: "center" }}>
                          {new Intl.NumberFormat().format(product.price)} đ
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
    </>
  );
}
