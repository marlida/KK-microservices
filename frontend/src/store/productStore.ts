import { create } from "zustand";
import { Product } from "../types/Product";
import * as productAPI from "@/app/api/product";
import { ProductCreationPayload } from "@/lib/productUtils"; // Import ProductCreationPayload

interface ProductState {
	products: {
		data: Product[];
		message: string;
	};
	removeProduct: (id: number) => Promise<void>;
	fetchProducts: () => Promise<void>;
	updateProduct: (id: number, updatedProduct: Product) => Promise<void>; // Consider if this also needs ProductCreationPayload or a similar partial type
	createProduct: (productData: ProductCreationPayload) => Promise<Product>; // Changed to ProductCreationPayload
}

const useProductStore = create<ProductState>((set) => ({
	products: {
		data: [],
		message: "",
	},
	removeProduct: async (id) => {
		try {
			const { message } = await productAPI.deleteProduct(id);
			set((state) => ({
				products: {
					...state.products,
					data: state.products.data.filter((product) => product.id !== id),
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to remove product:", error);
		}
	},

	fetchProducts: async () => {
		try {
			const { data = [], message = "" } = await productAPI.fetchProducts();
			set({ products: { data, message } });
		} catch (error) {
			console.error("❌ Failed to fetch products:", error);
		}
	},

	createProduct: async (newProduct: ProductCreationPayload) => { 
		try {
			const { data, message } = await productAPI.createProduct(newProduct);
			console.log(data)
			set((state) => ({
				products: {
					...state.products,
					data: [...state.products.data, data],
					message,
				},
			}));
			return data;
		} catch (error) {
			console.error("❌ Failed to create product:", error);
			throw error;
		}
	},

	updateProduct: async (id, updatedProduct) => {
		try {
			const { data, message } = await productAPI.updateProduct(id, updatedProduct);
			set((state) => ({
				products: {
					...state.products,
					data: state.products.data.map((product) =>
						product.id === id ? { ...product, ...data } : product,
					),
					message,
				},
			}));
			return data;
		} catch (error) {
			console.error("❌ Failed to update product:", error);
			throw error;
		}
	},
}));

export default useProductStore;
