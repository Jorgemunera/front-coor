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

export const getPendingOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders", {
    params: { status: "En espera" },
  });
  return Array.isArray(response.data) ? response.data : response.data.data ?? [];
};

export const assignOrder = async (
  orderId: number,
  transporterId: number,
  routeId: number
): Promise<void> => {
  await api.post(`/orders/${orderId}/assign`, {
    transporterId,
    routeId,
  });
};
