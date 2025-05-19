import type { Transporter } from "../types/Transporter";
import api from "./api";

export const getAvailableTransporters = async (): Promise<Transporter[]> => {
  const response = await api.get("/transporters/available");
  return Array.isArray(response.data) ? response.data : response.data.data ?? [];
};
