import axios from "axios";
import { Order } from "@/types/Order";

const BASE_URL = "http://localhost:8000/jobs/"; // Corrected to use NEXT_PUBLIC_BASE_URL

export interface OrderCreationPayload
	extends Omit<Order, "id" | "createdAt" | "updatedAt" | "admin" | "product"> {
	adminId?: number | null; // Keep adminId for creation payload as backend might expect it
	productId?: number | null; // Keep productId for creation payload
}

export interface OrderUpdatePayload
	extends Partial<Omit<Order, "id" | "createdAt" | "updatedAt" | "admin" | "product">> {
	adminId?: number | null; // Keep adminId for update payload
	productId?: number | null; // Keep productId for update payload
}

export const fetchOrders = async (): Promise<Order[]> => {
	const res = await axios.get(`${BASE_URL}order`); // Construct URL correctly
	return res.data;
};

export const createOrder = async (orderData: OrderCreationPayload): Promise<Order> => {
	const response = await axios.post(`${BASE_URL}order`, orderData); // Construct URL correctly
	return response.data;
};

export const updateOrder = async (id: number, orderData: OrderUpdatePayload): Promise<Order> => {
	const response = await axios.put(`${BASE_URL}order/${id}`, orderData); // Construct URL correctly
	return response.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
	await axios.delete(`${BASE_URL}order/${id}`); // Construct URL correctly
};
