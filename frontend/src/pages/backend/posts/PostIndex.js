import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

export default function PostIndex() {
  // Step 1: Add state for post content
  const [postContent, setPostContent] = useState("");

  // Step 2: Create a function to handle the update
  const handleUpdate = () => {
    // Perform update logic here
    console.log("Update logic goes here");
  };
  return (
    <div class="content">
      <section class="content-header my-2">
        <h1 class="d-inline">Quản lý bài viết</h1>
        <a href="http://localhost:3000/admin/post/create" class="btn-add">
          Thêm mới
        </a>
        <div class="row mt-3 align-items-center">
          <div class="col-6">
            <ul class="manager">
              <li>
                <a href="post_index.html">Tất cả (123)</a>
              </li>
              <li>
                <a href="#">Xuất bản (12)</a>
              </li>
              <li>
                <a href="post_trash.html">Rác (12)</a>
              </li>
            </ul>
          </div>
          <div class="col-6 text-end">
            <input type="text" class="search d-inline" />
            <button class="d-inline btnsearch">Tìm kiếm</button>
          </div>
        </div>
        <div class="row mt-1 align-items-center">
          <div class="col-md-8">
            <select name="" class="d-inline me-1">
              <option value="">Hành động</option>
              <option value="">Bỏ vào thùng rác</option>
            </select>
            <button class="btnapply">Áp dụng</button>
            <select name="" class="d-inline me-1">
              <option value="">Chủ đề</option>
            </select>
            <button class="btnfilter">Lọc</button>
          </div>
          <div class="col-md-4 text-end">
            <nav aria-label="Page navigation example">
              <ul class="pagination pagination-sm justify-content-end">
                <li class="page-item disabled">
                  <a class="page-link">&laquo;</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    &raquo;
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section class="content-body my-2">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-center" style={{ width: 30 }}>
                <input type="checkbox" id="checkboxAll" />
              </th>
              <th class="text-center" style={{ width: 30 }}>
                Hình ảnh
              </th>
              <th>Tiêu đề bài viết</th>
              <th>Tên danh mục</th>
              <th class="text-center" style={{ width: 30 }}>
                ID
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="datarow">
              <td>
                <input type="checkbox" id="checkId" />
              </td>
              <td>
                <link
                  to="img-fluid"
                  src="public/images/post.jpg"
                  alt="post.jpg"
                ></link>
              </td>
              <td>
                <div class="name">
                  <a href="post_edit.html">Tiêu đề bài viết</a>
                </div>
                <div class="function_style">
                  <a href="#" class="text-success mx-1">
                    <i class="fa fa-toggle-on"></i>
                  </a>
                  <a href="post_edit.html" class="text-primary mx-1">
                    <i class="fa fa-edit"></i>
                  </a>
                  <a href="post_show.html" class="text-info mx-1">
                    <i class="fa fa-eye"></i>
                  </a>
                  <a href="#" class="text-danger mx-1">
                    <i class="fa fa-trash"></i>
                  </a>
                </div>
              </td>
              <td>Tên chủ đề</td>
              <td class="text-center">1</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
