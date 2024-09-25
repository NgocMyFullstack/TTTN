import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BrandService from "../../../services/BrandService";
import { useParams } from "react-router-dom";

export default function BrandEdit() {
  const { id } = useParams();
  const [brand, setBrand] = useState({});
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);
  const [sort_order, setSortOrder] = useState(1);
  const [imageFile, setImageFile] = useState(null); // Add imageFile state

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const result = await BrandService.show(id);
        const { brand } = result;
        setBrand(brand);
        setName(brand.name);
        setSlug(brand.slug);
        setDescription(brand.description);
        setStatus(brand.status);
        setSortOrder(brand.sort_order);
      } catch (error) {
        console.error("Error fetching brand details:", error);
      }
    };

    fetchBrandDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedBrand = new FormData();

    // Add other form data fields
    updatedBrand.append("name", name);
    updatedBrand.append("slug", slug);
    updatedBrand.append("description", description);
    updatedBrand.append("status", status);
    updatedBrand.append("sort_order", sort_order);

    // Add the image file if it's selected
    if (imageFile) {
      updatedBrand.append("image", imageFile);
    }

    try {
      const result = await BrandService.update(updatedBrand, id);
      alert(result.message);
      // You may choose to redirect to the brand index page or perform other actions after successful update
    } catch (error) {
      console.error("Error updating brand:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <section className="hdl-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-10">
                {/*CONTENT  */}
                <div className="content">
                  <section className="content-header my-2">
                    <h1 className="d-inline">Chỉnh sửa thương hiệu</h1>
                    <div className="text-end">
                      <a
                        href="http://localhost:3000/admin/brand/index"
                        className="btn btn-sm btn-success"
                      >
                        <i className="fa fa-arrow-left" /> Về danh sách
                      </a>
                    </div>
                  </section>
                  <section className="content-body my-2">
                    <div className="row">
                      <div className="col-md-9">
                        <div className="mb-3">
                          <label>
                            <strong>Tên thương hiệu (*)</strong>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>
                            <strong>Slug</strong>
                          </label>
                          <input
                            type="text"
                            name="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>
                            <strong>Mô tả</strong>
                          </label>
                          <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="box-container mt-4 bg-white">
                          <div className="box-header py-1 px-2 border-bottom">
                            <strong>Đăng</strong>
                          </div>
                          <div className="box-body p-2 border-bottom">
                            <p>Chọn trạng thái đăng</p>
                            <select
                              name="status"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="form-control"
                            >
                              <option value={1}>Xuất bản</option>
                              <option value={2}>Chưa xuất bản</option>
                            </select>
                          </div>
                          <div className="box-container mt-2 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                              <strong>Thứ tự</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                              <select
                                name="sort_order"
                                value={sort_order}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="form-control"
                              >
                                <option value={1}>Trước</option>
                                <option value={2}>Sau</option>
                              </select>
                            </div>
                          </div>
                          <div className="box-container mt-2 bg-white">
                            <div className="box-header py-1 px-2 border-bottom">
                              <strong>Hình đại diện</strong>
                            </div>
                            <div className="box-body p-2 border-bottom">
                              <input
                                type="file"
                                id="image"
                                name="image"
                                className="form-control"
                                onChange={handleImageChange}
                              />
                            </div>
                          </div>

                          <div className="box-footer text-end px-2 py-3">
                            <button
                              type="submit"
                              className="btn btn-success btn-sm text-end"
                            >
                              <i className="fa fa-save" aria-hidden="true" />{" "}
                              Cập nhật
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                {/*END CONTENT*/}
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
