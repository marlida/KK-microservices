import { create } from "zustand";
import axios from "axios";
import { User } from "../types/User";

interface UserState {
	users: User[];
	addUser: (user: User) => void;
	removeUser: (id: number) => void;
	fetchUsers: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
	users: [],
	addUser: (user) => set((state) => ({ users: [...state.users, user] })),
	removeUser: (id) => set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
	fetchUsers: async () => {
		try {
			const response = await axios.get('http://localhost:8000/jobs');
			const data: User[] = response.data;
			set({ users: data });
		} catch (error) {
			console.error('Failed to fetch users:', error);
		}
	},
}));

export default useUserStore;
