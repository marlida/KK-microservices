import type { Order } from "@/types/types";
import { useState } from "react";
import { updateOrder, deleteOrder } from "@/services/ServiceOrder";
import { OrderTable, OrderModal } from "./OrderDetail";

interface OrderProps {
	activeTab: string;
	orders: Order[];
	onOrderUpdate?: () => void;
}

const OrderComponent = ({ activeTab, orders, onOrderUpdate }: OrderProps) => {
	const safeOrders = Array.isArray(orders) ? orders : [];
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [editData, setEditData] = useState<Partial<Order>>({});
	const [isLoading, setIsLoading] = useState(false);

	const handleOrderClick = (order: Order) => {
		console.log("Selected order data:", order);
		console.log("adminId:", order.adminId);
		console.log("productId:", order.productId);
		console.log("admin object:", order.admin);
		console.log("product object:", order.product);

		setSelectedOrder(order);
		setEditData({
			name: order.name,
			status: order.status,
			customer_issue: order.customer_issue,
			technician_issue: order.technician_issue,
			deposit: order.deposit,
			total: order.total,
		});
		setIsModalOpen(true);
		setIsClosing(false);
		setIsEditMode(false);
	};

	// Function to toggle edit mode
	const toggleEditMode = () => {
		setIsEditMode(!isEditMode);
	};

	// Function to handle input changes
	const handleInputChange = (field: string, value: string | number) => {
		setEditData((prev) => ({
			...prev,
			[field]: value,
		}));
	}; // Function to save changes
	const handleSave = async () => {
		if (!selectedOrder) return;
		try {
			setIsLoading(true);

			// Prepare update data exactly as API expects
			const updateData = {
				name: editData.name || selectedOrder.name,
				adminId: selectedOrder.adminId,
				productId: selectedOrder.productId,
				status: editData.status || selectedOrder.status,
				customer_issue: editData.customer_issue || selectedOrder.customer_issue,
				technician_issue: editData.technician_issue || selectedOrder.technician_issue,
				deposit: editData.deposit || selectedOrder.deposit,
				total: editData.total || selectedOrder.total,
			};

			console.log("Sending update data:", updateData);
			console.log("Order ID parameter:", selectedOrder.id);

			await updateOrder(selectedOrder.id, updateData);

			setSelectedOrder((prev) => (prev ? { ...prev, ...editData } : null));
			setIsEditMode(false);
			if (onOrderUpdate) {
				onOrderUpdate();
			}

			alert("บันทึกข้อมูลสำเร็จ");
		} catch (error) {
			console.error("Error updating order:", error);
			alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
		} finally {
			setIsLoading(false);
		}
	};

	// Function to handle delete order
	const handleDelete = async () => {
		if (!selectedOrder) return;

		const confirmDelete = window.confirm(
			`คุณต้องการลบออเดอร์ #${selectedOrder.id} ใช่หรือไม่?`,
		);
		if (!confirmDelete) return;

		try {
			setIsLoading(true);
			await deleteOrder(selectedOrder.id);

			if (onOrderUpdate) {
				onOrderUpdate();
			}

			closeModal();
			alert("ลบออเดอร์สำเร็จ");
		} catch (error) {
			console.error("Error deleting order:", error);
			alert("เกิดข้อผิดพลาดในการลบออเดอร์");
		} finally {
			setIsLoading(false);
		}
	};

	// Function to close modal
	const closeModal = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsModalOpen(false);
			setSelectedOrder(null);
			setIsClosing(false);
		}, 300);
	};
	return (
		<div>
			{activeTab === "orders" && (
				<OrderTable orders={safeOrders} onOrderClick={handleOrderClick} />
			)}{" "}
			{selectedOrder && (
				<OrderModal
					selectedOrder={selectedOrder}
					editData={editData}
					isModalOpen={isModalOpen}
					isClosing={isClosing}
					isEditMode={isEditMode}
					isLoading={isLoading}
					onInputChange={handleInputChange}
					onToggleEditMode={toggleEditMode}
					onSave={handleSave}
					onDelete={handleDelete}
					onClose={closeModal}
				/>
			)}
		</div>
	);
};

export default OrderComponent;
