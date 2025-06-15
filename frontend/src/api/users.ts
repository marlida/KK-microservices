import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://100.81.246.52:80/api/jobs';

export const fetchUserData = async () => {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data;
};

export const createUser = async (userData: unknown) => {
    const response = await axios.post(`${API_BASE_URL}/user`, userData);
    return response.data;
};

export const updateUser = async (id: string, userData: unknown) => {
    const response = await axios.put(`${API_BASE_URL}/user/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await axios.delete(`${API_BASE_URL}/user/${id}`);
    return response.data;
};