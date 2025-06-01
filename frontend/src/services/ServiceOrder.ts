import axios from "axios";

interface UpdateOrderData {
	name?: string;
	status?: string;
	customer_issue?: string;
	technician_issue?: string;
	deposit?: number;
	total?: number;
	adminId?: number;
	productId?: number;
}

export const updateOrder = async (orderId: number, updatedData: UpdateOrderData): Promise<void> => {
	try {
		console.log("Updating order with data:", {
			orderId,
			data: updatedData,
			url: `http://172.20.10.4:8000/jobs/order/${orderId}`
		});
		
		const response = await axios.put(`http://172.20.10.4:8000/jobs/order/${orderId}`, updatedData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		
		console.log("Order updated successfully:", {
			orderId,
			updatedData,
			response: response.data
		});
	} catch (error: unknown) {
		const axiosError = error as { response?: { data?: unknown; status?: number; statusText?: string }; message?: string };
		console.error("Error updating order:", {
			orderId,
			updatedData,
			error: axiosError.response?.data || axiosError.message,
			status: axiosError.response?.status,
			statusText: axiosError.response?.statusText
		});
		throw error;
	}
};

export const deleteOrder = async (orderId: number): Promise<void> => {
	try {
		await axios.delete(`http://172.20.10.4:8000/jobs/order/${orderId}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log("Order deleted successfully:", orderId);
	} catch (error) {
		console.error("Error deleting order:", error);
		throw error;
	}
};

export const createOrder = async (orderData: UpdateOrderData): Promise<void> => {
	try {
		await axios.post("http://172.20.10.4:8000/jobs/order", orderData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log("Order created successfully:", orderData);
	} catch (error) {
		console.error("Error creating order:", error);
		throw error;
	}
};