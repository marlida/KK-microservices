import { create } from "zustand";
import axios from "axios";
import { Product } from "../types/Product";

interface ProductState {
	products: Product[];
	addProduct: (product: Product) => void;
	removeProduct: (id: number) => void;
	fetchProducts: () => Promise<void>; // ฟังก์ชันสำหรับดึงข้อมูลจาก API
}

const useProductStore = create<ProductState>((set) => ({
	products: [],
	addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
	removeProduct: (id) =>
		set((state) => ({ products: state.products.filter((product) => product.id !== id) })),
	fetchProducts: async () => {
		try {
			const response = await axios.get('http://localhost:8000/jobs'); // ดึงข้อมูลจาก API ด้วย axios
			const data: Product[] = response.data;
			set({ products: data }); // อัปเดต state
		} catch (error) {
			console.error('Failed to fetch products:', error); // แสดงข้อผิดพลาด
		}
	},
}));

export default useProductStore;
