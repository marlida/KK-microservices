import { FC, useState, ReactNode } from "react";
import { User } from "@/types";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserDetailProps {
	user: User;
}

const UserDetail: FC<UserDetailProps> = ({ user }): ReactNode => {
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<User>({ ...user });
	const updateUser = useUserStore((state) => state.updateUser);
	const removeUser = useUserStore((state) => state.removeUser);
	const message = useUserStore((state) => state.users.message);

	const handleChangeField = (key: keyof Pick<User, "name" | "tel">, value: string) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirm = async () => {
		if (!editData.name || !editData.tel) {
			showErrorToast("กรุณากรอกชื่อและเบอร์โทรศัพท์");
			return;
		}
		if (window.confirm("คุณต้องการยืนยันการบันทึกการเปลี่ยนแปลงข้อมูลใช่หรือไม่?")) {
			try {
				const updatedUserPayload: User = {
					...user,
					name: editData.name,
					tel: editData.tel,
				};
				await updateUser(user.id, updatedUserPayload);
				showSuccessToast(message || "อัปเดตผู้ใช้สำเร็จ!");
				setIsEditing(false);
			} catch (error) {
				console.error("ล้มเหลวในการอัปเดตผู้ใช้:", error);
				showErrorToast(message || "ล้มเหลวในการอัปเดตผู้ใช้ กรุณาลองใหม่อีกครั้ง");
			}
		}
	};

	const handleDelete = async () => {
		if (window.confirm("คุณต้องการยืนยันการลบข้อมูลผู้ใช้นี้ใช่หรือไม่?")) {
			try {
				await removeUser(user.id);
				showSuccessToast(message || "ลบผู้ใช้สำเร็จ!");
			} catch (error) {
				console.error("ล้มเหลวในการลบผู้ใช้:", error);
				showErrorToast(message || "ล้มเหลวในการลบผู้ใช้ กรุณาลองใหม่อีกครั้ง");
			}
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditData({ ...user });
	};

	if (isEditing) {
		return (
			<div className="flex items-center justify-center gap-2">
				<Input
					type="text"
					placeholder="Name"
					value={editData.name ?? ""}
					onChange={(e) => handleChangeField("name", e.target.value)}
					className="h-8 text-sm w-auto"
				/>
				<Input
					type="text"
					placeholder="Telephone"
					value={editData.tel ?? ""}
					onChange={(e) => handleChangeField("tel", e.target.value)}
					className="h-8 text-sm w-auto"
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

export default UserDetail;
