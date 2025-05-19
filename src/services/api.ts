import axios from "axios";
import { getToken } from "../utils/token";
import {config} from "../config/config";

const baseUrlApi = config.baseUrlApi;

const api = axios.create({
  baseURL: baseUrlApi + "/api/v1",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
