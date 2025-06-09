import axios from "axios";
import { User } from "@/types";

const BASE_URL: string = "http://localhost:8000/jobs/user";

export const fetchUsers = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const createUser = async (user: User) => {
    const res = await axios.post(BASE_URL, user);
    return res.data;
};

export const updateUser = async (id: number, user: User) => {
    const res = await axios.put(`${BASE_URL}/${id}`, user);
    return res.data;
};

export const deleteUser = async (id: number) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
};
