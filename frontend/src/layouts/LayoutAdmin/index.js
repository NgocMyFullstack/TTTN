import React from "react";
import "./LayoutAdminStyle.css";
import { FaPlus, FaProductHunt } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/Dashboard";
import "../../components/HeaderAdmin";
import Dashboard from "../../components/Dashboard";
import HeaderAdmin from "../../components/HeaderAdmin";

export default function LayoutAdmin() {
  function handleItemClick(item) {
    const hdlitem = document.getElementById(item);
    hdlitem.classList.toggle("active");
  }

  return (
    <div>
      <HeaderAdmin></HeaderAdmin>

      <section class="hdl-content">
        <div class="container-fluid">
          <div class="row">
            <Dashboard></Dashboard>
            <div class="col-md-10">
              <section class="content-body my-1">
                <Outlet></Outlet>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
