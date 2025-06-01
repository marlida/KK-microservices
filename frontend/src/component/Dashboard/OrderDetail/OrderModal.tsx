import type { Order } from "@/types/types";
import OrderModalForm from "./OrderModalForm";

interface OrderModalProps {
	selectedOrder: Order;
	editData: Partial<Order>;
	isModalOpen: boolean;
	isClosing: boolean;
	isEditMode: boolean;
	isLoading: boolean;
	onInputChange: (field: string, value: string | number) => void;
	onToggleEditMode: () => void;
	onSave: () => void;
	onDelete: () => void;
	onClose: () => void;
}

const OrderModal = ({
	selectedOrder,
	editData,
	isModalOpen,
	isClosing,
	isEditMode,
	isLoading,
	onInputChange,
	onToggleEditMode,
	onSave,
	onDelete,
	onClose,
}: OrderModalProps) => {
	if (!isModalOpen || !selectedOrder) return null;

	return (
		<div
			className={`fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-out ${
				isClosing ? "opacity-0" : "opacity-100"
			}`}
			onClick={onClose}>
			<div
				className={`bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-400 ease-out ${
					isClosing
						? "scale-95 opacity-0 translate-y-4"
						: "scale-100 opacity-100 translate-y-0"
				}`}
				style={{
					animation: isClosing ? "none" : "slideIn 0.4s ease-out forwards",
				}}
				onClick={(e) => e.stopPropagation()}>
				{" "}
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-gray-900">
						รายละเอียดออเดอร์ #{selectedOrder.id}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 text-2xl">
						×
					</button>
				</div>				<OrderModalForm
					selectedOrder={selectedOrder}
					editData={editData}
					isEditMode={isEditMode}
					isLoading={isLoading}
					onInputChange={onInputChange}
					onToggleEditMode={onToggleEditMode}
					onSave={onSave}
					onDelete={onDelete}
				/>
				<div className="mt-6 flex justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors cursor-pointer">
						ปิด
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderModal;
