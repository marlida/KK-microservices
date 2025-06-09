import axios from "axios";
import { Admin } from "@/types/Admin";

const BASE_URL: string = "http://localhost:8000/jobs/admin";

export const fetchAdmins = async () => {
	const res = await axios.get(BASE_URL);
	return res.data;
};

export const createAdmin = async (admin: Admin) => {
	const res = await axios.post(BASE_URL, admin);
	return res.data;
};

export const updateAdmin = async (id: number, admin: Admin) => {
	const res = await axios.put(`${BASE_URL}/${id}`, admin);
	return res.data;
};

export const deleteAdmin = async (id: number) => {
	const res = await axios.delete(`${BASE_URL}/${id}`);
	return res.data;
};
