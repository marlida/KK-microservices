import { FC, useState, useEffect, ReactNode } from "react";
import { Admin } from "@/types";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useAdminStore } from "@/store";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

interface AdminDetailProps {
	admin: Admin;
}

const AdminDetail: FC<AdminDetailProps> = ({ admin }): ReactNode => {
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [editData, setEditData] = useState<Admin>({ ...admin });
	const message = useAdminStore((state) => state.admins.message);
	const updateAdmin = useAdminStore((state) => state.updateAdmin);
	const removeAdmin = useAdminStore((state) => state.removeAdmin);

	useEffect(() => {
		setEditData({ ...admin });
	}, [admin]);

	const handleChangeField = (key: keyof Pick<Admin, "name" | "tel">, value: string) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirmUpdate = async () => {
		if (!editData.name) {
			showErrorToast("กรุณากรอกชื่อผู้ดูแลระบบ");
			return;
		}
		try {
			const updatedAdminPayload: Admin = {
				...admin,
				name: editData.name,
				tel: editData.tel,
			};
			await updateAdmin(admin.id, updatedAdminPayload);
			showSuccessToast(message || "อัปเดตผู้ดูแลระบบสำเร็จ!");
			setIsEditing(false);
		} catch (error) {
			console.error("ล้มเหลวในการอัปเดตผู้ดูแลระบบ:", error);
			showErrorToast(message || "ล้มเหลวในการอัปเดตผู้ดูแลระบบ กรุณาลองใหม่อีกครั้ง");
		}
	};

	const handleDelete = async () => {
		try {
			await removeAdmin(admin.id);
			showSuccessToast(message || "ลบผู้ดูแลระบบสำเร็จ!");
			setShowDeleteConfirm(false);
		} catch (error) {
			console.error("ล้มเหลวในการลบผู้ดูแลระบบ:", error);
			showErrorToast(message || "ล้มเหลวในการลบผู้ดูแลระบบ กรุณาลองใหม่อีกครั้ง");
			setShowDeleteConfirm(false);
		}
	};

	const handleCancelEdit = () => {
		setEditData({ ...admin });
		setIsEditing(false);
	};

	return (
		<div className="flex items-center justify-center gap-2">
			<AlertDialog open={isEditing} onOpenChange={setIsEditing}>
				<AlertDialogTrigger asChild>
					<Button
						size="icon"
						variant="outline"
						className="h-8 w-8">
						<PencilIcon className="w-4 h-4 text-blue-600" />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="sm:max-w-[425px]">
					<AlertDialogHeader>
						<AlertDialogTitle>แก้ไขข้อมูลผู้ดูแลระบบ</AlertDialogTitle>
						<AlertDialogDescription>
							แก้ไขรายละเอียดผู้ดูแลระบบด้านล่างนี้ คลิก &quot;บันทึก&quot;
							เพื่อยืนยันการเปลี่ยนแปลง
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="name" className="text-right">
								ชื่อผู้ดูแล
							</label>
							<Input
								id="name"
								type="text"
								placeholder="ชื่อผู้ดูแลระบบ"
								value={editData.name ?? ""}
								onChange={(e) => handleChangeField("name", e.target.value)}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="tel" className="text-right whitespace-nowrap">
								เบอร์โทรศัพท์
							</label>
							<Input
								id="tel"
								type="text"
								placeholder="เบอร์โทรศัพท์"
								value={editData.tel ?? ""}
								onChange={(e) => handleChangeField("tel", e.target.value)}
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
								onClick={handleConfirmUpdate}
								className="bg-blue-800 hover:bg-blue-900">
								<CheckIcon className="w-4 h-4" />
								บันทึก
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
				<AlertDialogTrigger asChild>
					<Button
						size="icon"
						variant="outline"
						className="h-8 w-8"
						onClick={() => setShowDeleteConfirm(true)}>
						<TrashIcon className="w-4 h-4 text-red-600" />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="sm:max-w-[425px]">
					<AlertDialogHeader>
						<AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
						<AlertDialogDescription>
							คุณต้องการลบผู้ดูแลระบบ &quot;{admin.name}&quot; ใช่หรือไม่?
							การกระทำนี้ไม่สามารถยกเลิกได้
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel asChild>
							<Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
								ยกเลิก
							</Button>
						</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button
								onClick={handleDelete}
								className="bg-red-600 hover:bg-red-700">
								ลบ
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default AdminDetail;
