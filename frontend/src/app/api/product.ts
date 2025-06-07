import axios from "axios";
import { Product } from "@/types/Product";
import { ProductCreationPayload } from "@/lib/productUtils"; // Import ProductCreationPayload

const BASE_URL: string = "http://localhost:8000/jobs/product";

export const fetchProducts = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const createProduct = async (product: ProductCreationPayload) => { // Changed to ProductCreationPayload
    const res = await axios.post(BASE_URL, product);
    return res.data;
};

export const updateProduct = async (id: number, product: Product) => {
    const res = await axios.put(`${BASE_URL}/${id}`, product);
    return res.data;
};

export const deleteProduct = async (id: number) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
};
