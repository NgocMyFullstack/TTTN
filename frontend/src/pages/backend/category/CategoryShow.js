import React from 'react'
import HeaderAdmin from '../../../components/HeaderAdmin'
import Dashboard from '../../../components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
export default function CategoryShow() {
    return (
        <div>
            <HeaderAdmin />
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">
                        <Dashboard />
                        <div className="col-md-10">
                            {/*CONTENT  */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Chi tiết</h1>
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-md-12 text-end">
                                            <a href="category_index.html" className="btn btn-primary btn-sm">
                                                <i className="fa fa-arrow-left" /> Về danh sách
                                            </a>
                                            <a href="category_edit.html" className="btn btn-success btn-sm">
                                                <i className="fa fa-edit" /> Sửa
                                            </a>
                                            <a href="category_index.html" className="btn btn-danger btn-sm">
                                                <i className="fa fa-trash" /> Xóa
                                            </a>
                                        </div>
                                    </div>
                                </section>
                                <section className="content-body my-2">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 180 }}>Tên trường</th>
                                                <th>Giá trị</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Id</td>
                                                <td>1</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                            {/*END CONTENT*/}
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
