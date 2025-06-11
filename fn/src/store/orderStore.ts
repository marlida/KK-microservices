import { create } from "zustand";
import { Order } from "../types/Order";
import { fetchOrders as apiFetchOrders, createOrder as apiCreateOrder, updateOrder as apiUpdateOrder, deleteOrder as apiDeleteOrder, OrderCreationPayload, OrderUpdatePayload } from "@/app/api/order";
import axios from "axios"; // Import axios

interface OrderData {
	data: Order[];
	message?: string;
	total?: number;
}

interface OrderState {
	orders: OrderData;
	hasFetched: boolean;
	fetchOrders: () => Promise<void>;
	createOrder: (orderData: OrderCreationPayload) => Promise<void>;
	updateOrder: (id: number, updatedOrder: OrderUpdatePayload) => Promise<void>; // Use OrderUpdatePayload
	removeOrder: (id: number) => Promise<void>;
}

const useOrderStore = create<OrderState>()(
	(set, get) => ({
		orders: { data: [] },
		hasFetched: false,
		fetchOrders: async () => {
			if (get().hasFetched) return;
			try {
				const fetchedOrders = await apiFetchOrders(); // apiFetchOrders returns Order[]
				set({ orders: { data: fetchedOrders, total: fetchedOrders.length }, hasFetched: true });
			} catch (error) {
				console.error('Failed to fetch orders:', error);
				let errorMessage = "Failed to fetch orders";
				if (axios.isAxiosError(error) && error.response?.data?.message) {
					errorMessage = error.response.data.message;
				} else if (error instanceof Error) {
					errorMessage = error.message;
				}
				set({ orders: { data: [], message: errorMessage }, hasFetched: true });
			}
		},
		createOrder: async (orderData) => {
			try {
				const newOrder = await apiCreateOrder(orderData); // apiCreateOrder returns Order
				set((state) => ({
					orders: {
						...state.orders,
						data: [...state.orders.data, newOrder], // Add newOrder directly
						// message: "Order created successfully" // Optional: set a generic success message
					},
				}));
			} catch (error) {
				console.error("Failed to create order:", error);
				let errorMessage = "Failed to create order";
				if (axios.isAxiosError(error) && error.response?.data?.message) {
					errorMessage = error.response.data.message;
				} else if (error instanceof Error) {
					errorMessage = error.message;
				}
				set((state) => ({ orders: { ...state.orders, message: errorMessage } }));
				throw error;
			}
		},
		updateOrder: async (id, updatedOrderPayload) => { // parameter is OrderUpdatePayload
			try {
				const updatedOrder = await apiUpdateOrder(id, updatedOrderPayload); // apiUpdateOrder returns Order
				set((state) => ({
					orders: {
						...state.orders,
						data: state.orders.data.map((o) => (o.id === id ? updatedOrder : o)), // Replace with updatedOrder
						// message: "Order updated successfully" // Optional
					},
				}));
			} catch (error) {
				console.error("Failed to update order:", error);
				let errorMessage = "Failed to update order";
				if (axios.isAxiosError(error) && error.response?.data?.message) {
					errorMessage = error.response.data.message;
				} else if (error instanceof Error) {
					errorMessage = error.message;
				}
				set((state) => ({ orders: { ...state.orders, message: errorMessage } }));
				throw error;
			}
		},
		removeOrder: async (id) => {
			try {
				await apiDeleteOrder(id); // apiDeleteOrder returns void
				set((state) => ({
					orders: {
						...state.orders,
						data: state.orders.data.filter((order) => order.id !== id),
						// message: "Order deleted successfully" // Optional
					},
				}));
			} catch (error) {
				console.error("Failed to delete order:", error);
				let errorMessage = "Failed to delete order";
				if (axios.isAxiosError(error) && error.response?.data?.message) {
					errorMessage = error.response.data.message;
				} else if (error instanceof Error) {
					errorMessage = error.message;
				}
				set((state) => ({ orders: { ...state.orders, message: errorMessage } }));
				throw error;
			}
		},
	})
);

export default useOrderStore;
