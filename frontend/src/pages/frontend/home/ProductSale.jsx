import React, { useEffect, useState } from "react";
import ProductItem from "../../../components/ProductItem";

import ProductServie from "../../../services/ProductService";
export default function ProductSale() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await ProductServie.productsale(8);
      console.log("🚀 ~ resaaaaaaaaaaaa:", res);
      setProduct(res.products);
    })();
  }, []);
  return (
    <>
      <div class="product-category mt-3">
        <div class="row">
          <div class="col-md-3">
            <div class="category-title bg-main">
              <h3 class="fs-5 py-3 text-center text-uppercase">
                Sản phẩm khuyến mãi
              </h3>
              <img
                class="img-fluid d-none d-md-block"
                src={require("../../../assets/sale.jpg")}
                style={{ width: "900px", height: "750px" }}
                alt=""
              />
            </div>
          </div>
          <div class="col-md-9">
            <div class="row product-list">
              {product.map((product, index) => {
                return (
                  <div className="col-6 col-md-3 mb-4" key={index}>
                    <ProductItem product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
