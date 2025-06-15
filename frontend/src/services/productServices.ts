import { createProduct, fetchProductData, updateProduct, deleteProduct } from "@/api/product";
import { Product } from "@/types/product";

export class ProductServices {
    static async fetchProductData() {
        try {
            const res = await fetchProductData();
            const data = res.data || [];
            if (!data || data.length === 0) {
                throw new Error("ไม่มีข้อมูลสินค้า");
            }
            return data;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:", error);
            throw new Error("ไม่สามารถดึงข้อมูลสินค้าได้");
        }
    }

    static async createProduct(productData: Partial<Product>) {
        try {
            const res = await createProduct(productData);
            return res.message;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการสร้างสินค้า:", error);
            throw new Error("ไม่สามารถสร้างสินค้าได้");
        }
    }

    static async updateProduct(id: string, productData: Partial<Product>) {
        try {
            const res = await updateProduct(id, productData);
            return res;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตสินค้า:", error);
            throw new Error("ไม่สามารถอัปเดตสินค้าได้");
        }
    }

    static async deleteProduct(id: string) {
        try {
            const res = await deleteProduct(id);
            return res.message;
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการลบสินค้า:", error);
            throw new Error("ไม่สามารถลบสินค้าได้");
        }
    }
}
