import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;
const request = axios.create({
  baseURL: baseURL,
  timeout: 10 * 1000
});

request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const response = error.response;

    // 根据返回的http状态码做不同的处理
    switch (response?.status) {
      case 401:
        // token失效
        break;
      case 403:
        // 没有权限
        break;
      case 500:
        // 服务端错误
        console.error("服务端错误500");
        break;
      case 503:
        // 服务端错误
        console.error("服务端错误503");
        break;
      default:
        break;
    }
    return Promise.reject(response || { message: error.message });
  }
);

export default request;
