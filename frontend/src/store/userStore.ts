import { create } from "zustand";
import { User } from "../types";
import * as userAPI from "@/app/api/user";

interface UserState {
	users: {
		data: User[];
		message: string;
	};
	removeUser: (id: number) => Promise<void>;
	fetchUsers: () => Promise<void>;
	updateUser: (id: number, updatedUser: User) => Promise<void>;
	createUser: (userData: User) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
	users: {
		data: [],
		message: "",
	},
	removeUser: async (id) => {
		try {
			const { message } = await userAPI.deleteUser(id);
			set((state) => ({
				users: {
					...state.users,
					data: state.users.data.filter((user) => user.id !== id),
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to remove user:", error);
		}
	},

	fetchUsers: async () => {
		try {
			const { data = [], message = "" } = await userAPI.fetchUsers();
			set({ users: { data, message } });
		} catch (error) {
			console.error("❌ Failed to fetch users:", error);
		}
	},

	createUser: async (userData) => {
		try {
			const { data, message } = await userAPI.createUser(userData);
			set((state) => ({
				users: {
					...state.users,
					data: [...state.users.data, data],
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to create user:", error);
		}
	},

	updateUser: async (id, updatedUser) => {
		try {
			const { message } = await userAPI.updateUser(id, updatedUser);
			set((state) => ({
				users: {
					...state.users,
					data: state.users.data.map((user) =>
						user.id === id ? { ...user, ...updatedUser } : user,
					),
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to update user:", error);
		}
	},
}));

export default useUserStore;
