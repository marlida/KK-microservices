import { create } from "zustand";
import { Category, CategoryCreatePayload } from "../types/Category";
import * as categoryAPI from "@/app/api/category";

interface CategoryState {
	categories: {
		data: Category[];
		message: string;
	};
	removeCategory: (id: number) => Promise<void>;
	fetchCategories: () => Promise<void>;
	updateCategory: (id: number, updatedCategory: Category) => Promise<void>;
	createCategory: (categoryData: CategoryCreatePayload) => Promise<Category>;
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

	createCategory: async (newCategory: CategoryCreatePayload) => {
		try {
			const { data, message } = await categoryAPI.createCategory(newCategory);
			set((state) => ({
				categories: {
					...state.categories,
					data: [...state.categories.data, data],
					message,
				},
			}));
			return data;
		} catch (error) {
			console.error("❌ Failed to create category:", error);
			throw error;
		}
	},

	updateCategory: async (id, updatedCategory) => {
		try {
			const { data, message } = await categoryAPI.updateCategory(id, updatedCategory);
			set((state) => ({
				categories: {
					...state.categories,
					data: state.categories.data.map((category) =>
						category.id === id ? { ...category, ...data } : category,
					),
					message,
				},
			}));
			return data;
		} catch (error) {
			console.error("❌ Failed to update category:", error);
			throw error;
		}
	},
}));

export default useCategoryStore;
