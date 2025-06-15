import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://100.81.246.52:80/api/jobs';

export const fetchProductData = async () => {
    const response = await axios.get(`${API_BASE_URL}/product`);
    return response.data;
};

export const createProduct = async (productData: unknown) => {
    const response = await axios.post(`${API_BASE_URL}/product`, productData);
    return response.data;
};

export const updateProduct = async (id: string, productData: unknown) => {
    const response = await axios.put(`${API_BASE_URL}/product/${id}`, productData);
    return response.data;
};

export const deleteProduct = async (id: string) => {
    const response = await axios.delete(`${API_BASE_URL}/product/${id}`);
    return response.data;
};