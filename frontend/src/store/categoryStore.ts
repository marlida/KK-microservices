import { create } from "zustand";
import axios from "axios";
import { Category } from "../types/Category";

interface CategoryState {
	categories: Category[];
	addCategory: (category: Category) => void;
	removeCategory: (id: number) => void;
	fetchCategories: () => Promise<void>;
}

const useCategoryStore = create<CategoryState>((set) => ({
	categories: [],
	addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
	removeCategory: (id) =>
		set((state) => ({ categories: state.categories.filter((category) => category.id !== id) })),
	fetchCategories: async () => {
		try {
			const response = await axios.get("http://localhost:8000/jobs"); // ดึงข้อมูลจาก API ด้วย axios
			const data: Category[] = response.data;
			set({ categories: data }); // อัปเดต state
		} catch (error) {
			console.error("Failed to fetch categories:", error); // แสดงข้อผิดพลาด
		}
	},
}));

export default useCategoryStore;
