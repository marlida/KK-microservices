import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAdminData = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin`);
  return response.data;
};

export const createAdmin = async (adminData: any) => {
  const response = await axios.post(`${API_BASE_URL}/admin`, adminData);
  return response.data;
};

export const updateAdmin = async (id: string, adminData: any) => {
  const response = await axios.put(`${API_BASE_URL}/admin/${id}`, adminData);
  return response.data;
};

export const deleteAdmin = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/${id}`);
  return response.data;
};