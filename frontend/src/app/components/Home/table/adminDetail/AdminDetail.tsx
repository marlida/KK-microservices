import { FC, useState } from "react";
import { Admin } from "@/types";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAdminStore } from "@/store";
import { showSuccessToast } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminDetailProps {
	admin: Admin;
}

const AdminDetail: FC<AdminDetailProps> = ({ admin }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<Admin>({ ...admin });
	const message = useAdminStore((state) => state.admins.message);
	const updateAdmin = useAdminStore((state) => state.updateAdmin);
	const removeAdmin = useAdminStore((state) => state.removeAdmin);

	const handleChangeField = (key: keyof Pick<Admin, "name" | "tel">, value: string) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirm = async () => {
		if (editData.name || editData.tel) {
			if (window.confirm("คุณต้องการยืนยันการบันทึกการเปลี่ยนแปลงข้อมูลใช่หรือไม่?")) {
				try {
					const updatedAdminPayload: Admin = {
						...admin,
						name: editData.name,
						tel: editData.tel,
					};
					await updateAdmin(admin.id, updatedAdminPayload);
					showSuccessToast(message || "Admin updated successfully!");
					setIsEditing(false);
				} catch {
					showSuccessToast(message || "Failed to update admin.");
				}
			}
		} else {
			setIsEditing(false);
		}
	};

	const handleDelete = async () => {
		if (window.confirm("คุณต้องการยืนยันการลบข้อมูลผู้ดูแลระบบนี้ใช่หรือไม่?")) {
			try {
				await removeAdmin(admin.id);
				showSuccessToast(message || "Admin removed successfully!");
			} catch {
				showSuccessToast(message || "Failed to remove admin.");
			}
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditData({ ...admin });
	};

	if (isEditing) {
		return (
			<div className="flex items-center justify-center gap-2">
				<Input
					type="text"
					placeholder="Name"
					value={editData.name ?? ""}
					onChange={(e) => handleChangeField("name", e.target.value)}
					className="h-8"
				/>
				<Input
					type="text"
					placeholder="Telephone"
					value={editData.tel ?? ""}
					onChange={(e) => handleChangeField("tel", e.target.value)}
					className="h-8"
				/>
				<Button onClick={handleConfirm} size="icon" variant="outline" className="h-8 w-8">
					<CheckIcon className="w-4 h-4 text-green-600" />
				</Button>
				<Button onClick={handleCancel} size="icon" variant="outline" className="h-8 w-8">
					<XMarkIcon className="w-4 h-4 text-gray-600" />
				</Button>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center gap-2">
			<Button
				onClick={() => setIsEditing(true)}
				size="icon"
				variant="outline"
				className="h-8 w-8">
				<PencilIcon className="w-4 h-4 text-blue-600" />
			</Button>
			<Button onClick={handleDelete} size="icon" variant="outline" className="h-8 w-8">
				<TrashIcon className="w-4 h-4 text-red-600" />
			</Button>
		</div>
	);
};

export default AdminDetail;
