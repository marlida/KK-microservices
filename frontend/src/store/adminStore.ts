import { create } from "zustand";
import { Admin } from "../types/Admin";
import axios from "axios";

interface AdminState {
	admins: {
		data: Admin[];
		message: string;
	};
	addAdmin: (admin: Admin) => void;
	removeAdmin: (id: number) => void;
	fetchAdmins: () => Promise<void>;
}

const useAdminStore = create<AdminState>((set) => ({
	admins: {
		data: [],
		message: "",
	},
	addAdmin: (admin) =>
		set((state) => ({ admins: { ...state.admins, data: [...state.admins.data, admin] } })),
	removeAdmin: (id) =>
		set((state) => ({
			admins: { ...state.admins, data: state.admins.data.filter((admin) => admin.id !== id) },
		})),
	fetchAdmins: async () => {
		try {
			const response = await axios.get("http://localhost:8000/jobs/admin"); // ดึงข้อมูลจาก API ด้วย axios
			const { data, message } = response.data;
			set({ admins: { data, message } }); // อัปเดต state
		} catch (error) {
			console.error("Failed to fetch admins:", error); // แสดงข้อผิดพลาด
		}
	},
	createAdmin: async () => {
		try {
			const response = await axios.post("http://localhost:8000/jobs/admin");

			const { message } = response.data;
			set((state) => ({ admins: { ...state.admins, message } }));
		} catch (error) {
			console.error("Failed to creat formAdmin:", error);
		}
	},
}));

export default useAdminStore;
