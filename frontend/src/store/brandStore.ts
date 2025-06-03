import { create } from "zustand";
import { Brand } from "../types/Brand";
import * as brandAPI from "@/app/api/brand";

interface BrandState {
	brands: {
		data: Brand[];
		message: string;
	};
	removeBrand: (id: number) => Promise<void>;
	fetchBrands: () => Promise<void>;
	updateBrand: (id: number, updatedBrand: Brand) => Promise<void>;
	createBrand: (brandData: Brand) => Promise<void>;
}

const useBrandStore = create<BrandState>((set) => ({
	brands: {
		data: [],
		message: "",
	},
	removeBrand: async (id) => {
		try {
			const { message } = await brandAPI.deleteBrand(id);
			set((state) => ({
				brands: {
					...state.brands,
					data: state.brands.data.filter((brand) => brand.id !== id),
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to remove brand:", error);
		}
	},

	fetchBrands: async () => {
		try {
			const { data = [], message = "" } = await brandAPI.fetchBrands();
			set({ brands: { data, message } });
		} catch (error) {
			console.error("❌ Failed to fetch brands:", error);
		}
	},

	createBrand: async (brandData) => {
		try {
			const { data, message } = await brandAPI.createBrand(brandData);
			set((state) => ({
				brands: {
					...state.brands,
					data: [...state.brands.data, data],
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to create brand:", error);
		}
	},

	updateBrand: async (id, updatedBrand) => {
		try {
			const { message } = await brandAPI.updateBrand(id, updatedBrand);
			set((state) => ({
				brands: {
					...state.brands,
					data: state.brands.data.map((brand) =>
						brand.id === id ? { ...brand, ...updatedBrand } : brand,
					),
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to update brand:", error);
		}
	},
}));

export default useBrandStore;
