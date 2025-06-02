export interface Order {
  id: number;
  name?: string;
  adminId?: number;
  productId?: number;
  status?: string;
  customer_issue?: string;
  technician_issue?: string;
  deposit?: number;
  total?: number;
  createdAt: string;
  updatedAt: string;
}
