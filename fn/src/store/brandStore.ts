import { create } from "zustand";
import { Brand } from "../types/Brand";
import * as brandAPI from "@/app/api/brand";

interface BrandState {
	brands: {
		data: Brand[];
		message: string;
	};
	hasFetched: boolean; // Add this line
	removeBrand: (id: number) => Promise<void>;
	fetchBrands: () => Promise<void>;
	updateBrand: (id: number, updatedBrand: Brand) => Promise<void>;
	createBrand: (brandData: Brand) => Promise<void>;
}

const useBrandStore = create<BrandState>((set, get) => ({ // Add get here
	brands: {
		data: [],
		message: "",
	},
	hasFetched: false, // Add this line
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
		if (get().hasFetched) return; // Add this line to prevent re-fetching
		try {
			const { data = [], message = "" } = await brandAPI.fetchBrands();
			set({ brands: { data, message }, hasFetched: true }); // Set hasFetched to true
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
