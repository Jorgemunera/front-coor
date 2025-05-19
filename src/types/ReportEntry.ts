export interface ReportEntry {
  orderId: number;
  status: 'En espera' | 'En tránsito' | 'Entregado';
  deliveryTimeHours: number | null;
  transporter: string;
  createdAt: string;
  deliveredAt: string | null;
}
