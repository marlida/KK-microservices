import { FC, useState, useEffect, ReactNode } from "react";
import { Brand } from "@/types";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useBrandStore } from "@/store";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface BrandDetailProps {
	brand: Brand;
}

const BrandDetail: FC<BrandDetailProps> = ({ brand }): ReactNode => {
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [editData, setEditData] = useState<Partial<Brand>>({ ...brand });
	const updateBrand = useBrandStore((state) => state.updateBrand);
	const removeBrand = useBrandStore((state) => state.removeBrand);
	const brandMessage = useBrandStore((state) => state.brands.message);

	useEffect(() => {
		setEditData({ ...brand });
	}, [brand]);

	const handleChangeField = (key: keyof Brand, value: string | number) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirmUpdate = async () => {
		if (!editData.name) {
			showErrorToast("กรุณากรอกชื่อแบรนด์");
			return;
		}
		try {
			await updateBrand(brand.id, editData as Brand);
			showSuccessToast(brandMessage || "อัปเดตแบรนด์สำเร็จ!");
			setIsEditing(false);
		} catch (error) {
			console.error("ล้มเหลวในการอัปเดตแบรนด์:", error);
			showErrorToast(brandMessage || "ล้มเหลวในการอัปเดตแบรนด์ กรุณาลองใหม่อีกครั้ง");
		}
	};

	const handleDelete = async () => {
		try {
			await removeBrand(brand.id);
			showSuccessToast(brandMessage || "ลบแบรนด์สำเร็จ!");
			setShowDeleteConfirm(false);
		} catch (error) {
			console.error("ล้มเหลวในการลบแบรนด์:", error);
			showErrorToast(brandMessage || "ล้มเหลวในการลบแบรนด์ กรุณาลองใหม่อีกครั้ง");
			setShowDeleteConfirm(false);
		}
	};

	const handleCancelEdit = () => {
		setEditData({ ...brand });
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
						<AlertDialogTitle>แก้ไขข้อมูลแบรนด์</AlertDialogTitle>
						<AlertDialogDescription>
							แก้ไขชื่อแบรนด์ด้านล่างนี้ คลิก &quot;บันทึก&quot;
							เพื่อยืนยันการเปลี่ยนแปลง
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="name" className="text-right">
								ชื่อแบรนด์
							</label>
							<Input
								id="name"
								type="text"
								placeholder="ชื่อแบรนด์"
								value={editData.name || ""}
								onChange={(e) => handleChangeField("name", e.target.value)}
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
							คุณต้องการลบแบรนด์ &quot;{brand.name}&quot; ใช่หรือไม่?
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

export default BrandDetail;
