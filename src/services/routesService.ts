import api from "./api";
import { type Route } from "../types/Route";

export const getAvailableRoutes = async (): Promise<Route[]> => {
  const response = await api.get("/routes");
  return Array.isArray(response.data) ? response.data : response.data.data ?? [];
};
