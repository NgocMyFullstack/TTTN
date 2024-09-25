import httpAxios from "../httpAxios";

const BannerService={
    index:()=>{
        return httpAxios.get("banner/index");
    },
    show : (id)=>{
        return httpAxios.get(`banner/show/${id}`);
    },
    store:(data)=>{
        return httpAxios.post(`banner/store`,data);
    },
    update:(data,id)=>{
        return httpAxios.post(`banner/update/${id}`,data);
    },
    destroy:(id)=>{
        return httpAxios.delete(`banner/destroy/${id}`);
    },
    status: (id) => {
        return httpAxios.get(`banner/status/${id}`);
    },

};
export default BannerService;
