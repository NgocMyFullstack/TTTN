import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BrandService from "../../../services/BrandService";
import { urlImage } from "../../../config";
import LoadingSpinner from "../../../LoadingSpinner";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaEye,
  FaToggleOn,
  FaTrash,
  FaToggleOff,
} from "react-icons/fa";

export default function BrandIndex() {
  const [brands, setBrands] = useState([]);
  const [load, setLoad] = useState(true);
  const [reload, setReLoad] = useState(0);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sort_order, setSortOrder] = useState(1);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    (async () => {
      setLoad(false);
      const result = await BrandService.index();
      setBrands(result.brands);
      setLoad(false);
    })();
  }, [reload]);

  //hàm thêm

  const handleSubmit = (e) => {
    e.preventDefault();
    const image = document.getElementById("image");
    const brand = new FormData();
    brand.append("name", name);
    brand.append("description", description);
    brand.append("sort_order", sort_order);
    brand.append("status", status);
    brand.append("image", image);
    brand.append(
      "image",
      image.isDefaultNamespace.length === 0 ? "" : image.files[0]
    );
    (async () => {
      const result = await BrandService.store(brand);
      alert(result.message);
      setReLoad(result.brand.id);
    })();
  };

  //xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        const result = await BrandService.destroy(id);
        alert(result.message);
        setReLoad(result.brand.id);
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const result = await BrandService.status(id);
      console.log("API Result:", result);

      // Toggle the status locally
      const updatedBrands = brands.map((brand) =>
        brand.id === id ? { ...brand, status: result.brand.status } : brand
      );
      console.log("Updated Brands:", updatedBrands);

      setBrands(updatedBrands);
      setReLoad((prevReload) => prevReload + 1);
    } catch (error) {
      console.error("Lỗi chuyển đổi trạng thái thương hiệu:", error);
    }
  };

  return (
    <div>
      <section className="hdl-content">
        <div className="container-fluid">
          <div className="row">
            {/*CONTENT  */}
            <div className="content">
              <section className="content-header my-2">
                <h1 className="d-inline">Thương hiệu</h1>
                <hr style={{ border: "none" }} />
              </section>
              <section className="content-body my-2">
                <div className="row">
                  <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label>
                          <strong>Tên thương hiệu (*)</strong>
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          placeholder="Nhập tên danh mục"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label>
                          <strong>Mô tả</strong>
                        </label>
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          rows="4"
                          placeholder="Mô tả"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label>
                          <strong>Hình đại diện</strong>
                        </label>
                        <input
                          type="file"
                          id="image"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label>
                          <strong>sắp xếp</strong>
                        </label>
                        <select
                          onChange={(e) => setSortOrder(e.target.value)}
                          value={status}
                          className="form-select"
                        >
                          <option value={1}>Trước</option>
                          <option value={2}>Sau</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label>
                          <strong>Trạng thái</strong>
                        </label>
                        <select
                          onChange={(e) => setStatus(e.target.value)}
                          value={status}
                          className="form-control"
                        >
                          <option value={1}>Xuất bản</option>
                          <option value={2}>Chưa xuất bản</option>
                        </select>
                      </div>
                      <div className="mb-3 text-end">
                        <button
                          type="submit"
                          className="btn btn-success"
                          name="THEM"
                        >
                          <i className="fa fa-save" /> Lưu[Thêm]
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-8">
                    {load ? <LoadingSpinner /> : ""}
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center" style={{ width: 30 }}>
                            <input type="checkbox" id="checkboxAll" />
                          </th>
                          <th className="text-center" style={{ width: 90 }}>
                            Hình ảnh
                          </th>
                          <th>Tên thương hiệu</th>
                          <th>Tên slug</th>
                          <th className="text-center" style={{ width: 30 }}>
                            ID
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {brands &&
                          brands.map((brand, index) => (
                            <tr className="datarow" key={index}>
                              <td className="text-center">
                                <input type="checkbox" />
                              </td>
                              <td>
                                <img
                                  className="img-fluid"
                                  src={urlImage + "brand/" + brand.image}
                                  alt={brand.image}
                                />
                              </td>
                              <td>
                                <div className="name">
                                  {/* Update the Link component to include the brand id */}
                                  <Link to={`/admin/brand/edit/${brand.id}`}>
                                    {brand.name}
                                  </Link>
                                </div>
                                <div className="function_style">
                                  <Link
                                    to={`/admin/brand/index`}
                                    className={`px-1 text-${
                                      brand.status === 1 ? "success" : "danger"
                                    }`}
                                    onClick={() =>
                                      handleToggleStatus(brand.id, brand.status)
                                    }
                                  >
                                    {brand.status === 1 ? (
                                      <FaToggleOn />
                                    ) : (
                                      <FaToggleOff />
                                    )}
                                  </Link>
                                  <Link
                                    to={`/admin/brand/edit/${brand.id}`}
                                    className="px-1 text-primary"
                                  >
                                    <FaEdit />
                                  </Link>
                                  <Link
                                    to={`http://localhost:3000/admin/brand/show/${brand.id}`}
                                    className="px-1 text-info"
                                  >
                                    <FaEye />
                                  </Link>
                                  <a
                                    href="#st"
                                    className="px-1 text-danger"
                                    onClick={() => handleDelete(brand.id)}
                                  >
                                    <FaTrash />
                                  </a>
                                </div>
                              </td>
                              <td>{brand.slug}</td>
                              <td className="text-center">{brand.id}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
            {/*END CONTENT*/}
          </div>
        </div>
      </section>
    </div>
  );
}
