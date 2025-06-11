import { create } from "zustand";
import { User } from "../types";
import * as userAPI from "@/app/api/user";

interface UserState {
	users: {
		data: User[];
		message: string;
	};
	currentUser: User | null; // Added currentUser
	hasFetched: boolean;
	removeUser: (id: number) => Promise<void>;
	fetchUsers: () => Promise<void>;
	fetchCurrentUser: () => Promise<void>; // Added fetchCurrentUser action
	updateUser: (id: number, updatedUser: User) => Promise<void>;
	createUser: (userData: User) => Promise<void>;
}

const useUserStore = create<UserState>((set, get) => ({
	users: {
		data: [],
		message: "",
	},
	currentUser: null, // Initialize currentUser
	hasFetched: false,
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
		if (get().hasFetched) return;
		try {
			const { data = [], message = "" } = await userAPI.fetchUsers();
			set({ users: { data, message }, hasFetched: true });
		} catch (error) {
			console.error("❌ Failed to fetch users:", error);
		}
	},

	fetchCurrentUser: async () => {
		// This is a placeholder implementation.
		// Replace with an actual API call to an endpoint like /api/user/me or similar
		// that returns the currently authenticated user.
		try {
			// For now, let's assume the first user in the list is the current user if no specific endpoint exists.
			// Or, if you have a dedicated endpoint, call it here.
			// const currentUserData = await userAPI.fetchCurrentAuthenticatedUser();
			// set({ currentUser: currentUserData });

			// Placeholder: if users are not fetched, fetch them first.
			if (!get().hasFetched) {
				await get().fetchUsers();
			}
			const usersData = get().users.data;
			if (usersData.length > 0) {
				set({ currentUser: usersData[0] }); // Set the first user as current user
			} else {
				// If you have a specific API for current user, and it returns null/error,
				// you might want to set currentUser to null or handle the error.
				console.warn("No users found to set as current user, or /api/user/me endpoint needs implementation.");
				set({ currentUser: null });
			}
		} catch (error) {
			console.error("❌ Failed to fetch current user:", error);
			set({ currentUser: null });
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
