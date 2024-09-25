import axios from "axios";
import { urlAPI } from "./config";

const httpAxios = axios.create({
  baseURL: urlAPI,
  headers: { "X-Custom-Header": "foobar" },
});

// Thời gian chờ mặc định giữa các lần thử lại
const RETRY_AFTER_MS = 5000;

httpAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);

      if (error.response.status === 429) {
        const retryAfter = error.response.headers["retry-after"]
          ? parseInt(error.response.headers["retry-after"], 10) * 1000
          : RETRY_AFTER_MS;

        await new Promise((resolve) => setTimeout(resolve, retryAfter));

        return httpAxios(error.config);
      } else {
        // Xử lý lỗi khi không phải là mã lỗi 429
        return Promise.reject(error.response.data); // Đảm bảo trả về một đối tượng có cấu trúc đúng
      }
    } else if (error.request) {
      console.error("Error request:", error.request);
      return Promise.reject(error.request); // Xử lý lỗi yêu cầu không được gửi đi
    } else {
      console.error("Error message:", error.message);
      return Promise.reject(error.message); // Xử lý các lỗi khác
    }
  }
);

export default httpAxios;
