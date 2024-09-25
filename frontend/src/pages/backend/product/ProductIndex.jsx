import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaEdit,
  FaEye,
  FaToggleOff,
  FaToggleOn,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../../../LoadingSpinner";
import { urlImage } from "../../../config";
import ProductService from "../../../services/ProductService";

export default function ProductIndex() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReLoad] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await ProductService.index();
      console.log("🚀 ~ file: ProductIndex.jsx:19 ~ result:", result);
      setProducts(result.products);
      setLoading(false);
    })();
  }, [reload]);

  const handDelete = (id) => {
    (async () => {
      const result = await ProductService.destroy(id);
      setReLoad(result.product.id);
      // toast.success(result.message);
    })();
  };

  const handleStatus = (id) => {
    (async () => {
      const result = await ProductService.status(id);
      setReLoad(Date.now);
    })();
  };

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Sản phẩm</h1>

        <div className="row mt-3 align-items-center"></div>
      </section>
      <section className="content-body my-2">
        <table className="table table-bordered">
          <thead>
            <Link
              className="btn btn-primary btn-sm "
              to={"/admin/product/create"}
              style={{ color: "white" }}
            >
              {" "}
              Thêm
            </Link>

            <div className="row mt-3 align-items-center"></div>
            <tr>
              <th>ID</th>

              <th className="text-center" style={{ width: 200 }}>
                Hình ảnh
              </th>
              <th>Tên sản phẩm</th>
              <th>Mô tả</th>

              <th>giá</th>
              <th>Thể Loại</th>
              <th className="text-center" style={{ width: 30 }}>
                <input type="checkbox" id="checkboxAll" />
              </th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => {
                return (
                  <tr className="datarow" key={index}>
                    <td className="text-center" style={{ width: 30 }}>
                      {product.id}
                    </td>
                    <td>
                      <img
                        className="img-fluid"
                        src={urlImage + "product/" + product.image}
                        alt={product.image}
                      />
                    </td>
                    <td>
                      <div className="name">
                        <a href="product_edit.html">{product.name}</a>
                      </div>
                      <div className="function_style">
                        <button
                          onClick={() => handleStatus(product.id)}
                          className={
                            product.status === 1
                              ? "border-0 px-1 text-success"
                              : "border-0 px-1 text-danger"
                          }
                        >
                          {product.status === 1 ? (
                            <FaToggleOn />
                          ) : (
                            <FaToggleOn />
                          )}
                        </button>
                        <Link
                          to={"/admin/product/edit/" + product.id}
                          className="px-1 text-primary"
                        >
                          <FaEdit />
                        </Link>
                        <Link
                          to={`/admin/product/show/${product.id}`}
                          className="px-1 text-info"
                        >
                          <FaEye />
                        </Link>
                        <button
                          onClick={() => handDelete(product.id)}
                          className="px-1 text-danger"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                    <td>{product.detail}</td>

                    <td>{product.price}</td>
                    <td>{product.category.name}</td>
                    <td>
                      <input type="checkbox" id="checkId" />
                    </td>
                  </tr>
                );
              })}
            {loading ? <LoadingSpinner /> : ""}
          </tbody>
        </table>
      </section>
    </div>
  );
}
