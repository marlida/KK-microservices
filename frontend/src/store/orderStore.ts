import { create } from "zustand";
import axios from "axios";
import { Order } from "../types/Order";

interface OrderState {
	orders: Order[];
	addOrder: (order: Order) => void;
	removeOrder: (id: number) => void;
	fetchOrders: () => Promise<void>; // เพิ่มฟังก์ชัน fetchOrders
}

const useOrderStore = create<OrderState>((set) => ({
	orders: [],
	addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
	removeOrder: (id) =>
		set((state) => ({ orders: state.orders.filter((order) => order.id !== id) })),
	fetchOrders: async () => {
		try {
			const response = await axios.get('http://localhost:8000/jobs'); // ดึงข้อมูลจาก API ด้วย axios
			const data: Order[] = response.data;
			set({ orders: data }); // อัปเดต state
		} catch (error) {
			console.error('Failed to fetch orders:', error); // แสดงข้อผิดพลาด
		}
	},
}));

export default useOrderStore;
