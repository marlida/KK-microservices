import { FC, useState, useEffect, ReactNode } from "react";
import { Order } from "@/types";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useOrderStore, useAdminStore, useProductStore } from "@/store";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface OrderDetailProps {
	order: Order;
}

const OrderDetail: FC<OrderDetailProps> = ({ order }): ReactNode => {
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<Order>({ ...order });
	const updateOrder = useOrderStore((state) => state.updateOrder);
	const removeOrder = useOrderStore((state) => state.removeOrder);
	const orderMessage = useOrderStore((state) => state.orders.message);
	const fetchOrders = useOrderStore((state) => state.fetchOrders); // Added fetchOrders from store

	const admins = useAdminStore((state) => state.admins.data);
	const products = useProductStore((state) => state.products.data);

	useEffect(() => {
		setEditData({ ...order });
	}, [order]);

	const handleChangeField = (key: keyof Order, value: string | number | null) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirm = async () => {
		if (editData) {
			try {
				const updatedValues: Partial<Order> = {};
				if (order.name !== editData.name) updatedValues.name = editData.name;
				if (order.adminId !== editData.adminId)
					updatedValues.adminId = editData.adminId;
				if (order.productId !== editData.productId)
					updatedValues.productId = editData.productId;
				if (order.status !== editData.status) updatedValues.status = editData.status;
				if (order.customer_issue !== editData.customer_issue) updatedValues.customer_issue = editData.customer_issue;
				if (order.technician_issue !== editData.technician_issue) updatedValues.technician_issue = editData.technician_issue;
				if (order.deposit !== editData.deposit) updatedValues.deposit = editData.deposit;
				if (order.total !== editData.total) updatedValues.total = editData.total;
				if (order.quantity !== editData.quantity) updatedValues.quantity = editData.quantity;

				if (Object.keys(updatedValues).length > 0) {
					await updateOrder(editData.id, updatedValues);
					showSuccessToast(orderMessage || "Order updated successfully."); // Changed to showSuccessToast
					await fetchOrders(); // Ensure fetchOrders is awaited if it's async and you need to wait for it
				}
				setIsEditing(false); // Replaced onClose with setIsEditing(false)
			} catch (error) {
				console.error("ล้มเหลวในการอัปเดตคำสั่งซื้อ:", error);
				showErrorToast(orderMessage || "ล้มเหลวในการอัปเดตคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง");
			}
		}
	};

	const handleDelete = async () => {
		if (window.confirm("คุณต้องการยืนยันการลบข้อมูลคำสั่งซื้อนี้ใช่หรือไม่?")) {
			try {
				await removeOrder(order.id);
				showSuccessToast(orderMessage || "ลบคำสั่งซื้อสำเร็จ!");
			} catch (error) {
				console.error("ล้มเหลวในการลบคำสั่งซื้อ:", error);
				showErrorToast(orderMessage || "ล้มเหลวในการลบคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง");
			}
		}
	};

	const handleCancelEdit = () => {
		setEditData({ ...order });
	};
	return (
		<div className="flex items-center justify-center gap-2">
			<AlertDialog open={isEditing} onOpenChange={setIsEditing}>
				<AlertDialogTrigger asChild>
					<Button size="icon" variant="outline" className="h-8 w-8">
						<PencilIcon className="w-4 h-4 text-blue-600" />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="sm:max-w-[600px]">
					<AlertDialogHeader>
						<AlertDialogTitle>แก้ไขข้อมูลคำสั่งซื้อ</AlertDialogTitle>
						<AlertDialogDescription>
							แก้ไขรายละเอียดคำสั่งซื้อด้านล่างนี้ คลิก &quot;บันทึก&quot;
							เพื่อยืนยันการเปลี่ยนแปลง
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="name" className="text-right">
								ชื่อคำสั่งซื้อ
							</label>
							<Input
								id="name"
								type="text"
								placeholder="ชื่อคำสั่งซื้อ"
								value={editData.name ?? ""}
								onChange={(e) => handleChangeField("name", e.target.value)}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="admin" className="text-right">
								ผู้ดูแลระบบ
							</label>
							<Select
								value={editData.adminId?.toString() ?? ""}
								onValueChange={(value) =>
									handleChangeField("adminId", value ? parseInt(value) : null)
								}>
								<SelectTrigger className="col-span-3 h-8 text-sm">
									<SelectValue placeholder="เลือกผู้ดูแลระบบ" />
								</SelectTrigger>
								<SelectContent>
									{admins?.map((admin) => (
										<SelectItem key={admin.id} value={admin.id.toString()}>
											{admin.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="productId" className="text-right">
								สินค้า
							</label>
							<Select
								value={editData.productId?.toString() ?? ""}
								onValueChange={(value) =>
									handleChangeField("productId", value ? parseInt(value) : null)
								}>
								<SelectTrigger className="col-span-3 h-8 text-sm">
									<SelectValue placeholder="เลือกสินค้า" />
								</SelectTrigger>
								<SelectContent>
									{products?.map((product) => (
										<SelectItem key={product.id} value={product.id.toString()}>
											{product.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="quantity" className="text-right">
								จำนวน
							</label>
							<Input
								id="quantity"
								type="number"
								placeholder="จำนวน"
								value={editData.quantity ?? ""}
								onChange={(e) =>
									handleChangeField(
										"quantity",
										e.target.value ? parseInt(e.target.value) : null,
									)
								}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="status" className="text-right">
								สถานะ
							</label>
							<Select
								value={editData.status ?? ""}
								onValueChange={(value) => handleChangeField("status", value)}
								>
								<SelectTrigger className="col-span-3 h-8 text-sm">
									<SelectValue placeholder="เลือกสถานะ" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="กำลังรอดำเนินการ">กำลังรอดำเนินการ</SelectItem>
									<SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
									<SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="customer_issue" className="text-right">
								ปัญหาลูกค้า
							</label>
							<Input
								id="customer_issue"
								type="text"
								placeholder="ปัญหาลูกค้า"
								value={editData.customer_issue ?? ""}
								onChange={(e) =>
									handleChangeField("customer_issue", e.target.value)
								}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="technician_issue" className="text-right">
								ปัญหาช่าง
							</label>
							<Input
								id="technician_issue"
								type="text"
								placeholder="ปัญหาช่าง"
								value={editData.technician_issue ?? ""}
								onChange={(e) =>
									handleChangeField("technician_issue", e.target.value)
								}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="deposit" className="text-right">
								มัดจำ
							</label>
							<Input
								id="deposit"
								type="number"
								placeholder="มัดจำ"
								value={editData.deposit ?? ""}
								onChange={(e) =>
									handleChangeField(
										"deposit",
										e.target.value ? parseFloat(e.target.value) : null,
									)
								}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="total" className="text-right">
								ทั้งหมด
							</label>
							<Input
								id="total"
								type="number"
								placeholder="ทั้งหมด"
								value={editData.total ?? ""}
								onChange={(e) =>
									handleChangeField(
										"total",
										e.target.value ? parseFloat(e.target.value) : null,
									)
								}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel asChild>
							<Button onClick={handleCancelEdit} variant="outline">
								ยกเลิก
							</Button>
						</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button
								onClick={handleConfirm}
								className="bg-blue-800 hover:bg-blue-900">
								<CheckIcon className="w-4 h-4" />
								บันทึก
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<Button onClick={handleDelete} size="icon" variant="outline" className="h-8 w-8">
				<TrashIcon className="w-4 h-4 text-red-600" />
			</Button>
		</div>
	);
};

export default OrderDetail;

