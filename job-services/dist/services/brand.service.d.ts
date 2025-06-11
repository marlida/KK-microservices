import { Brand, BrandCreateInput } from "../types/brand";
export declare class brandService {
    static createBrand: (brandData: BrandCreateInput) => Promise<Brand>;
    static getBrand: () => Promise<Brand[]>;
    static getBrandById: (id: number, options?: {
        catId?: number;
        prodId?: number;
        include?: "categories" | "products" | "both";
    }) => Promise<Brand | null>;
    static getBrandExists: (name: string) => Promise<Brand | null>;
    static updateBrand: (id: number, brandData: BrandCreateInput) => Promise<Brand>;
    static deleteBrand: (id: number) => Promise<Brand>;
}
