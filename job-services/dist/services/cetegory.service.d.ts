import { Category, CategoryCreateInput } from "../types/category";
export declare class categoryService {
    static createCategory: (categoryData: {
        name?: string;
        brandId?: number;
    }) => Promise<Category>;
    static getCategory: () => Promise<Category[]>;
    static getCategoryById: (id: number) => Promise<Category | null>;
    static getCategoryExists: (name: string) => Promise<Category | null>;
    static updateCategory: (id: number, categoryData: CategoryCreateInput) => Promise<Category>;
    static deleteCategory: (id: number) => Promise<Category>;
}
