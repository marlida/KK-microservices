import { create } from "zustand";
import { Admin } from "../types/Admin";
import * as adminAPI from "@/app/api/admin";

interface AdminState {
	admins: {
		data: Admin[];
		message: string;
	};
	hasFetched: boolean; // Add this line
	removeAdmin: (id: number) => Promise<void>;
	fetchAdmins: () => Promise<void>;
	updateAdmin: (id: number, updatedAdmin: Admin) => Promise<void>;
	createAdmin: (adminData: Admin) => Promise<void>;
}

const useAdminStore = create<AdminState>((set, get) => ({ // Add get here
	admins: {
		data: [],
		message: "",
	},
	hasFetched: false, // Add this line
	removeAdmin: async (id) => {
		try {
			const { message } = await adminAPI.deleteAdmin(id);
			set((state) => ({
				admins: {
					...state.admins,
					data: state.admins.data.filter((admin) => admin.id !== id),
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to remove admin:", error);
		}
	},

	fetchAdmins: async () => {
		if (get().hasFetched) return; // Add this line to prevent re-fetching
		try {
			const { data = [], message = "" } = await adminAPI.fetchAdmins();
			set({ admins: { data, message }, hasFetched: true }); // Set hasFetched to true
		} catch (error) {
			console.error("❌ Failed to fetch admins:", error);
		}
	},

	createAdmin: async (adminData) => {
		try {
			const { data, message } = await adminAPI.createAdmin(adminData);
			set((state) => ({
				admins: {
					...state.admins,
					data: [...state.admins.data, data],
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to create admin:", error);
		}
	},

	updateAdmin: async (id, updatedAdmin) => {
		try {
			const { message } = await adminAPI.updateAdmin(id, updatedAdmin);
			set((state) => ({
				admins: {
					...state.admins,
					data: state.admins.data.map((admin) =>
						admin.id === id ? { ...admin, ...updatedAdmin } : admin,
					),
					message,
				},
			}));
		} catch (error) {
			console.error("❌ Failed to update admin:", error);
		}
	},
}));

export default useAdminStore;
