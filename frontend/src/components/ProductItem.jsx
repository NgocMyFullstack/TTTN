import React from "react";
import { urlImage } from "../config";
import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <div className="product-item border">
      <div className="product-item-image">
        <Link to={"/product_detail/" + product.id}>
          <a href="product_detail.html">
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
        </Link>
      </div>
      <h2 className="product-item-name text-main text-center fs-5 py-1">
        <a href="product_detail.html">{product.name}</a>
      </h2>
      <h3 className="product-item-price">
        {/* <div className="flex-fill"><del>200.000đ</del></div> */}
        <div style={{ textAlign: "center" }}>
          {new Intl.NumberFormat().format(product.price)} đ
        </div>
      </h3>
    </div>
  );
}
