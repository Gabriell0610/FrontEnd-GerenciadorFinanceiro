import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/",
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status == 401) {
      window.location.href = "/login";
    }
  }
);

export default api;
