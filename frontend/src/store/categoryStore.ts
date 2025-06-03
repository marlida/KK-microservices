import { create } from "zustand";
import { Category } from "../types/Category";
import * as categoryAPI from "@/app/api/category";

interface CategoryState {
	categories: {
		data: Category[];
		message: string;
	};
	removeCategory: (id: number) => Promise<void>;
	fetchCategories: () => Promise<void>;
	updateCategory: (id: number, updatedCategory: Category) => Promise<void>;
	createCategory: (categoryData: Category) => Promise<void>;
}

const useCategoryStore = create<CategoryState>((set) => ({
	categories: {
		data: [],
		message: "",
	},
	removeCategory: async (id) => {
		try {
			const { message } = await categoryAPI.deleteCategory(id);
			set((state) => ({
				categories: {
					...state.categories,
					data: state.categories.data.filter((category) => category.id !== id),
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to remove category:", error);
		}
	},

	fetchCategories: async () => {
		try {
			const { data = [], message = "" } = await categoryAPI.fetchCategories();
			set({ categories: { data, message } });
		} catch (error) {
			console.error("❌ Failed to fetch categories:", error);
		}
	},

	createCategory: async (categoryData) => {
		try {
			const { data, message } = await categoryAPI.createCategory(categoryData);
			set((state) => ({
				categories: {
					...state.categories,
					data: [...state.categories.data, data],
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to create category:", error);
		}
	},

	updateCategory: async (id, updatedCategory) => {
		try {
			const { message } = await categoryAPI.updateCategory(id, updatedCategory);
			set((state) => ({
				categories: {
					...state.categories,
					data: state.categories.data.map((category) =>
						category.id === id ? { ...category, ...updatedCategory } : category,
					),
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to update category:", error);
		}
	},
}));

export default useCategoryStore;
