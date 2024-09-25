import httpAxios from "../httpAxios";

const ProductServie = {
  // code cũ
  index: () => {
    return httpAxios.get(`product/index`);
  },
  index1: (page) => {
    return httpAxios.get(`product/index1?page=${page}`);
  },
  show: (id) => {
    return httpAxios.get(`product/show/${id}`);
  },

  store: (data) => {
    return httpAxios.post(`product/store`, data);
  },
  update: (data, id) => {
    return httpAxios.post(`product/update/${id}`, data);
  },
  destroy: (id) => {
    return httpAxios.delete(`product/destroy/${id}`);
  },
  status: (id) => {
    return httpAxios.get(`product/status/${id}`);
  },

  getStore: () => {
    return httpAxios.get(`product/import`);
  },
  storeProductStore: (productstore) => {
    return httpAxios.post(`product/storeimport`, productstore);
  },
  productCategoryHome: (id) => {
    return httpAxios.get(`product_category_home/${id}`);
  },

  productAll: () => {
    return httpAxios.get(`product_all`);
  },
  productCategory: (slug) => {
    return httpAxios.get(`product_category / ${slug}`);
  },
  productBrand: (slug) => {
    return httpAxios.get(`product_brand / ${slug}`);
  },
  productDetail: (slug) => {
    return httpAxios.get(`product_detail / ${slug}`);
  },
  productsale: (limit) => {
    console.log("🚀 ~ limit:", limit);
    return httpAxios.get(`product/productsale/${limit}`);
  },
  otherProducts: (limit, id) => {
    return httpAxios.get(`product/otherProducts/${limit}/${id}`);
  },
  addtocart: (id, data) => {
    return httpAxios.post(`product/addtocart/${id}`, data);
  },

  productnew: (limit) => {
    console.log("🚀 ~ limit:", limit);
    return httpAxios.get(`product/productnew/${limit}`);
  },
  producthotbuy: (limit) => {
    return httpAxios.get(`product/producthotbuy/${limit}`);
  },
  product_category_home: (id) => {
    console.log("🚀 ~ product_category_home:", id);

    return httpAxios.get(`product/product_category_home/${id}`);
  },
};
export default ProductServie;
