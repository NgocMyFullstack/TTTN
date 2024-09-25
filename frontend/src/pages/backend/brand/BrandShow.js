import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BrandService from '../../../services/BrandService';
import { useParams } from 'react-router-dom';


export default function BrandShow() {
    const { id } = useParams();
    const [brand, setBrand] = useState({});
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
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
                console.error('Error fetching brand details:', error);
            }
        };

        fetchBrandDetails();
    }, [id]);
    return (
        <div>
            <section className="hdl-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            {/*CONTENT  */}
                            <div className="content">
                                <section className="content-header my-2">
                                    <h1 className="d-inline">Chi tiết</h1>
                                    <div className="row mt-2 align-items-center">
                                        <div className="col-md-12 text-end">
                                            <a href="brand_index.html" className="btn btn-primary btn-sm">
                                                <i className="fa fa-arrow-left" /> Về danh sách
                                            </a>
                                            <a href="brand_edit.html" className="btn btn-success btn-sm">
                                                <i className="fa fa-edit" /> Sửa
                                            </a>
                                            <a href="brand_index.html" className="btn btn-danger btn-sm">
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
                                            <tr>
                                                <td>name</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>description</td>
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
