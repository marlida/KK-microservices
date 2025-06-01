import { User } from "@/types/types";
import axios from "axios";

interface CreateUserData {
	name: string;
	tel: string;
}

export const createUser = async (userData: CreateUserData): Promise<void> => {
	try {
		await axios.post("http://172.20.10.4:8000/jobs/user", userData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log("User created successfully:", userData);
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
};

export const updateUser = async (userId: string, updatedData: User): Promise<void> => {
	try {
		console.log("API ID", userId);
		await axios.put(`http://172.20.10.4:8000/jobs/user/${userId}`, updatedData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log("User updated successfully:", { userId, updatedData });
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
};

export const deleteUser = async (userId: string): Promise<void> => {
	try {
		console.log("Deleting user with ID:", userId);
		await axios.delete(`http://172.20.10.4:8000/jobs/user/${userId}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log("User deleted successfully:", userId);
	} catch (error) {
		console.error("Error deleting user:", error);
		throw error;
	}
};
