import axios from "axios";
import { Category } from "@/types/Category";

const BASE_URL: string = "http://localhost:8000/jobs/category";

export const fetchCategories = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const createCategory = async (category: Category) => {
    const res = await axios.post(BASE_URL, category);
    return res.data;
};

export const updateCategory = async (id: number, category: Category) => {
    const res = await axios.put(`${BASE_URL}/${id}`, category);
    return res.data;
};

export const deleteCategory = async (id: number) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
};
