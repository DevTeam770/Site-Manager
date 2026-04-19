import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // חשוב לשליחת עוגיות (cookies) עם כל בקשה אם השרת משתמש ב-HTTP-only cookies לאחסון ה-Token
});

// הוספת ה-Token לכל בקשה
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// טיפול ב-Refresh Token במידה וקיבלנו 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const res = await axios.post(`${API_URL}/auth/refresh?refresh_token=${refreshToken}`);
        localStorage.setItem("access_token", res.data.access_token);
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (formData) => api.post("/auth/login", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  }),
  getMe: () => api.get("/auth/me"),
};

export const siteAPI = {
  getSites: () => api.get("/sites/"),
  getSections: (siteId) => api.get(`/sites/${siteId}/sections`),
};

export const deviceAPI = {
  getDevices: () => api.get("/devices/"),
  updatePosition: (deviceId, x, y) => api.put(`/devices/${deviceId}/position?x=${x}&y=${y}`),
  updateDevice: (deviceId, data) => api.patch(`/devices/${deviceId}`, data),
};

export const userAPI = {
  getAll: () => api.get("/users/"),
  create: (data) => api.post("/users/", data),
  delete: (id) => api.delete(`/users/${id}`),
};

export default api;