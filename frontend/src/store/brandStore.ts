import { create } from "zustand";
import axios from "axios";
import { Brand } from "../types/Brand";

interface BrandState {
	brands: Brand[];
	addBrand: (brand: Brand) => void;
	removeBrand: (id: number) => void;
	fetchBrands: () => Promise<void>; // เพิ่มฟังก์ชัน fetchBrands
}

const useBrandStore = create<BrandState>((set) => ({
	brands: [],
	addBrand: (brand) => set((state) => ({ brands: [...state.brands, brand] })),
	removeBrand: (id) =>
		set((state) => ({ brands: state.brands.filter((brand) => brand.id !== id) })),
	fetchBrands: async () => {
		try {
			const response = await axios.get('http://localhost:8000/jobs'); // ดึงข้อมูลจาก API ด้วย axios
			const data: Brand[] = response.data;
			set({ brands: data }); // อัปเดต state
		} catch (error) {
			console.error('Failed to fetch brands:', error); // แสดงข้อผิดพลาด
		}
	},
}));

export default useBrandStore;
