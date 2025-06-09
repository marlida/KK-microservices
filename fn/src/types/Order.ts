import { Admin } from './Admin'; 
import { Product } from './Product'; 

export interface Order {
  id: number;
  name: string;
  admin?: Admin | null; 
  adminId?: number | null;
  product?: Product | null;
  productId?: number | null;
  status?: string | null;
  customer_issue?: string | null;
  technician_issue?: string | null;
  deposit?: number | null;
  total?: number | null;
  quantity?: number; 
  userId?: number; 
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type OrderCreationPayload = Omit<Order, "id" | "createdAt" | "updatedAt" | "admin" | "product"> & {
  adminId: number;
  productId: number;
  userId: number;
  quantity: number;
};

export type OrderUpdatePayload = Partial<Omit<OrderCreationPayload, "userId">>;

