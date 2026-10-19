import axios from "axios";

const api = axios.create({
  baseURL:
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
    "http://localhost:9000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("eg_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// Interceptor to handle global 401s (token expiry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("eg_token");
      // Optional: Redirect to login or dispatch logout action
    }
    return Promise.reject(error);
  }
);

export default api;
