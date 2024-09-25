import httpAxios from "../httpAxios";

const PostService = {
  //lấy ra danh sách
  index: () => {
    return httpAxios.get("post/index");
  },
  show: (id) => {
    return httpAxios.get(`post/show/${id}`);
  },
  store: (data) => {
    return httpAxios.post(`post/store`, data);
  },
  update: (data, id) => {
    return httpAxios.post(`post/update/${id}`, data);
  },
  destroy: (id) => {
    return httpAxios.delete(`post/destroy/${id}`);
  },
  status: (id) => {
    return httpAxios.get(`post/status/${id}`);
  },
  postnew: () => {
    return httpAxios.get("post/postnew");
  },
  postTopic: (slug, page) => {
    return httpAxios.get(`post/post_topic/${slug}?page=${page}`);
  },
  postAll: (page) => {
    return httpAxios.get(`post/post_all?page=${page}`);
  },
};
export default PostService;
