export interface Order {
  id: number;
  weight: number;
  dimensions: string;
  productType: string;
  destinationAddress: string;
  status: string;
  createdAt: string;
}
