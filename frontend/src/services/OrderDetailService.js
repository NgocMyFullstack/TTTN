import httpAxios from "../httpAxios";
const OrderDetailService = {
  // của me
  store: (data) => {
    return httpAxios.post(`orderdetail/store`, data);
  },

  // c
  store1: (data) => {
    return httpAxios.post(`orderdetail/store1`, data);
  },
};
export default OrderDetailService;
