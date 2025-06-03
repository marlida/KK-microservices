import { Product, ProductCreateInput } from "../types/product";
export declare class productService {
    static createProduct: (productData: {
        name?: string;
        price?: number;
        serial?: string;
        quantity?: number;
        description?: string;
        categoryId?: number;
        brandId?: number;
    }) => Promise<Product>;
    static getProduct: () => Promise<Product[]>;
    static getProductById: (id: number) => Promise<Product | null>;
    static getProductExists: (name: string) => Promise<Product | null>;
    static updateProduct: (id: number, productData: ProductCreateInput) => Promise<Product>;
    static deleteProduct: (id: number) => Promise<Product>;
}
