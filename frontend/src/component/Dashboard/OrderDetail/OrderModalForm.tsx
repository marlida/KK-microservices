import type { Order } from "@/types/types";

interface OrderModalFormProps {
	selectedOrder: Order;
	editData: Partial<Order>;
	isEditMode: boolean;
	isLoading: boolean;
	onInputChange: (field: string, value: string | number) => void;
	onToggleEditMode: () => void;
	onSave: () => void;
	onDelete: () => void;
}

const OrderModalForm = ({
	selectedOrder,
	editData,
	isEditMode,
	isLoading,
	onInputChange,
	onToggleEditMode,
	onSave,
	onDelete,
}: OrderModalFormProps) => {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "ซ่อมเสร็จแล้ว":
				return "bg-green-100 text-green-800";
			case "กำลังดำเนินการ":
				return "bg-blue-100 text-blue-800";
			case "รอดำเนินการ":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<>
			<div className="flex gap-2 justify-between">
				<div className="flex gap-2">
					{!isEditMode ? (
						<button
							onClick={onToggleEditMode}
							className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm">
							แก้ไข
						</button>
					) : (
						<>
							<button
								onClick={onSave}
								disabled={isLoading}
								className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm disabled:opacity-50">
								{isLoading ? "กำลังบันทึก..." : "บันทึก"}
							</button>
							<button
								onClick={onToggleEditMode}
								className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm">
								ยกเลิก
							</button>
						</>
					)}
				</div>

				{!isEditMode && (
					<button
						onClick={onDelete}
						disabled={isLoading}
						className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm disabled:opacity-50">
						{isLoading ? "กำลังลบ..." : "ลบ"}
					</button>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				<div className="space-y-3">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							รหัสออเดอร์
						</label>
						<p className="mt-1 text-sm text-gray-900">{selectedOrder.id}</p>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							ชื่อลูกค้า
						</label>
						{isEditMode ? (
							<input
								type="text"
								value={editData.name || ""}
								onChange={(e) => onInputChange("name", e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
							/>
						) : (
							<p className="mt-1 text-sm text-gray-900">{selectedOrder.name}</p>
						)}
					</div>{" "}
					<div>
						<label className="block text-sm font-medium text-gray-700">แอดมิน</label>
						<div className="mt-1 text-sm text-gray-900">
							<p>{selectedOrder.admin?.name || "ไม่ระบุ"}</p>
							{selectedOrder.adminId && (
								<p className="text-xs text-gray-500">ID: {selectedOrder.adminId}</p>
							)}
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">สินค้า</label>
						<div className="mt-1 text-sm text-gray-900">
							<p>{selectedOrder.product?.name || "ไม่ระบุ"}</p>
							{selectedOrder.productId && (
								<p className="text-xs text-gray-500">
									ID: {selectedOrder.productId}
								</p>
							)}
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							หมายเลขซีเรียล
						</label>
						<p className="mt-1 text-sm text-gray-900">
							{selectedOrder.product?.serial || "ไม่ระบุ"}
						</p>
					</div>
				</div>

				<div className="space-y-3">
					<div>
						<label className="block text-sm font-medium text-gray-700">สถานะ</label>
						{isEditMode ? (
							<select
								value={editData.status || ""}
								onChange={(e) => onInputChange("status", e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
								<option value="รอดำเนินการ">รอดำเนินการ</option>
								<option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
								<option value="ซ่อมเสร็จแล้ว">ซ่อมเสร็จแล้ว</option>
							</select>
						) : (
							<span
								className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${getStatusColor(
									selectedOrder.status,
								)}`}>
								{selectedOrder.status}
							</span>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">เงินมัดจำ</label>
						{isEditMode ? (
							<input
								type="number"
								value={editData.deposit || ""}
								onChange={(e) => onInputChange("deposit", Number(e.target.value))}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
							/>
						) : (
							<p className="mt-1 text-sm text-gray-900">
								฿{selectedOrder.deposit?.toLocaleString()}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">ราคารวม</label>
						{isEditMode ? (
							<input
								type="number"
								value={editData.total || ""}
								onChange={(e) => onInputChange("total", Number(e.target.value))}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
							/>
						) : (
							<p className="mt-1 text-sm text-gray-900">
								฿{selectedOrder.total?.toLocaleString()}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							วันที่สร้าง
						</label>
						<p className="mt-1 text-sm text-gray-900">
							{new Date(selectedOrder.createdAt).toLocaleDateString("th-TH", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</p>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							วันที่อัปเดต
						</label>
						<p className="mt-1 text-sm text-gray-900">
							{new Date(selectedOrder.updatedAt).toLocaleDateString("th-TH", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</p>
					</div>
				</div>
			</div>

			<div className="mt-6 space-y-3">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						ปัญหาที่ลูกค้าแจ้ง
					</label>
					{isEditMode ? (
						<textarea
							value={editData.customer_issue || ""}
							onChange={(e) => onInputChange("customer_issue", e.target.value)}
							rows={3}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
						/>
					) : (
						<div className="mt-1 p-3 bg-gray-50 rounded-md">
							<p className="text-sm text-gray-900">
								{selectedOrder.customer_issue || "ไม่มีข้อมูล"}
							</p>
						</div>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">หมายเหตุช่าง</label>
					{isEditMode ? (
						<textarea
							value={editData.technician_issue || ""}
							onChange={(e) => onInputChange("technician_issue", e.target.value)}
							rows={3}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
						/>
					) : (
						<div className="mt-1 p-3 bg-gray-50 rounded-md">
							<p className="text-sm text-gray-900">
								{selectedOrder.technician_issue || "ไม่มีข้อมูล"}
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default OrderModalForm;
