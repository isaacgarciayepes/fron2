import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    const fieldErrors = data?.fields ? Object.values(data.fields).join(" ") : "";
    const message = fieldErrors || data?.message || data?.error || error.message || "Error de conexión con el servidor";
    const normalized = new Error(message);
    normalized.status = error.response?.status;
    normalized.code = data?.code;
    normalized.details = data?.fields;
    return Promise.reject(normalized);
  },
);

export default api;
