import axios from "axios";
import { Brand } from "@/types/Brand";

const BASE_URL: string = "http://localhost:8000/jobs/brand";

export const fetchBrands = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const createBrand = async (brand: Brand) => {
    const res = await axios.post(BASE_URL, brand);
    return res.data;
};

export const updateBrand = async (id: number, brand: Brand) => {
    const res = await axios.put(`${BASE_URL}/${id}`, brand);
    return res.data;
};

export const deleteBrand = async (id: number) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
};
