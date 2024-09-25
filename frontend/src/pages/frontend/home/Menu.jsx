import React, { useState, useEffect } from "react";
import Category from "./Category";
import { Link } from "react-router-dom";
import CategoryServie from "../../../services/CategoryService";
import BrandService from "../../../services/BrandService";
import TopicServie from "../../../services/TopicService";

export default function Menu() {
  const [category, setCategory] = useState([]);
  const [brand, setbrand] = useState([]);
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await CategoryServie.index();
      console.log(res);
      const fetchbrand1 = await BrandService.index();
      const fetchTopic = await TopicServie.index();
      console.log(fetchTopic);
      console.log(fetchbrand1.brandetchbrand1);
      setCategory(res.categories);
      setbrand(fetchbrand1.brands);
      setTopic(fetchTopic.topics);
    };
    fetch();
  }, []);

  return (
    <>
      <section className="hdl-mainmenu bg-main">
        <div className="container">
          <div className="row">
            <div className="col-12 d-none d-md-block col-md-2 d-none d-md-block">
              <div className="dropdown list-category">
                <Category></Category>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <nav className="navbar navbar-expand-lg bg-main">
                <div className="container-fluid">
                  <a
                    className="navbar-brand d-block d-sm-none text-white"
                    href="index.html"
                  >
                    POILSHOP
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <a
                          className="nav-link text-white"
                          aria-current="page"
                          href="http://localhost:3000/"
                        >
                          Trang chủ
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link text-white"
                          aria-current="page"
                          href="http://localhost:3000/product_all"
                        >
                          Tất Cả sản phẩm
                        </a>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle text-white"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Thời trang nam
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item text-main"
                              href="http://localhost:3000/product_man/"
                            >
                              MAN
                            </a>
                          </li>
                          {/* <li>
                            <a
                              className="dropdown-item text-main"
                              href="product_category.html"
                            >
                              Áo thun nam{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item text-main"
                              href="product_category.html"
                            >
                              Sơ mi nam
                            </a>
                          </li> */}
                        </ul>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle text-white"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Thời trang nữ
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item text-main"
                              href="http://localhost:3000/product_women/"
                            >
                              Women
                            </a>
                          </li>
                          {/* <li>
                            <a
                              className="dropdown-item text-main"
                              href="product_category.html"
                            >
                              Đầm
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item text-main"
                              href="product_category.html"
                            >
                              Sơ mi nữ
                            </a>
                          </li> */}
                        </ul>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link dropdown-toggle text-white"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {" "}
                          Bài viết
                        </a>
                        <ul className="dropdown-menu w-100">
                          {topic &&
                            topic.length > 0 &&
                            topic.map((topic) => {
                              return (
                                <li key={topic.id}>
                                  <Link
                                    className="dropdown-item"
                                    to={`/post_topic/${topic.slug}`}
                                  >
                                    {topic.name}
                                  </Link>
                                </li>
                              );
                            })}
                          <Link to={"/postall"}>
                            <li>
                              <a className="dropdown-item">Tất cả bài viết</a>
                            </li>
                          </Link>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link text-white"
                          href="http://localhost:3000/post_page"
                        >
                          Giới thiệu
                        </a>
                      </li>{" "}
                      <li className="nav-item">
                        <a
                          href="http://localhost:3000/contact"
                          className="nav-link text-white"
                        >
                          Liên hệ
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
