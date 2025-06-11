import { FC, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store";
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

interface UserDetailProps {
	user: User;
}

const UserDetail: FC<UserDetailProps> = ({ user }): ReactNode => {
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [editData, setEditData] = useState<User>({ ...user });
	const updateUser = useUserStore((state) => state.updateUser);
	const removeUser = useUserStore((state) => state.removeUser);
	const message = useUserStore((state) => state.users.message);

	useEffect(() => {
		setEditData({ ...user });
	}, [user]);

	const handleChangeField = (key: keyof Pick<User, "name" | "tel">, value: string) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirmUpdate = async () => {
		if (!editData.name) {
			showErrorToast("กรุณากรอกชื่อผู้ใช้");
			return;
		}
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
	};

	const handleDelete = async () => {
		try {
			await removeUser(user.id);
			showSuccessToast(message || "ลบผู้ใช้สำเร็จ!");
			setShowDeleteConfirm(false);
		} catch (error) {
			console.error("ล้มเหลวในการลบผู้ใช้:", error);
			showErrorToast(message || "ล้มเหลวในการลบผู้ใช้ กรุณาลองใหม่อีกครั้ง");
			setShowDeleteConfirm(false);
		}
	};

	const handleCancelEdit = () => {
		setEditData({ ...user });
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
						<AlertDialogTitle>แก้ไขข้อมูลผู้ใช้</AlertDialogTitle>
						<AlertDialogDescription>
							แก้ไขรายละเอียดผู้ใช้ด้านล่างนี้ คลิก &quot;บันทึก&quot;
							เพื่อยืนยันการเปลี่ยนแปลง
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="name" className="text-right">
								ชื่อผู้ใช้
							</label>
							<Input
								id="name"
								type="text"
								placeholder="ชื่อผู้ใช้"
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
							คุณต้องการลบผู้ใช้ &quot;{user.name}&quot; ใช่หรือไม่?
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

export default UserDetail;
