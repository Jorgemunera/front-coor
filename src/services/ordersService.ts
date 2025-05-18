import api from "./api";
import { type Order } from "../types/Order";

export const createOrder = async (data: {
  destinationAddress: string;
  productType: string;
  weight: number;
  dimensions: string;
}): Promise<Order> => {
  const response = await api.post("/orders", data);
  return response.data;
};

export const getUserOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders/history/my");
  const raw = response.data;
  return Array.isArray(raw) ? raw : raw.data ?? [];
};
