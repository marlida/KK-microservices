export interface Product {
  id: number;
  name?: string;
  price?: number;
  serial?: string;
  description?: string;
  quantity?: number;
  sold?: number;
  brandId?: number;
  categoryId?: number;
  createdAt: string;
  updatedAt: string;
}
