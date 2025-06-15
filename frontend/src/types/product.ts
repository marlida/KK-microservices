export interface Product {
  id?: string;
  name: string;
  price: number;
  serial: string;
  quantity: number;
  sold: number;
  description: string;
  categoryId: number;
  brandId: number;
  createdAt: string; 
  updatedAt: string; 
}

export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type ProductUpdate = Partial<ProductInput>;