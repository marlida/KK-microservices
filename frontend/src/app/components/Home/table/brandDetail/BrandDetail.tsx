import { FC, useState, useEffect } from "react";
import { Brand } from "@/types";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useBrandStore } from "@/store";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BrandDetailProps {
	brand: Brand;
}

const BrandDetail: FC<BrandDetailProps> = ({ brand }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<Partial<Brand>>({ ...brand });
	const updateBrand = useBrandStore((state) => state.updateBrand);
	const removeBrand = useBrandStore((state) => state.removeBrand);
	const message = useBrandStore((state) => state.brands.message);

	useEffect(() => {
		if (message) {
			showSuccessToast(message);
		}
	}, [message]);

	const handleChangeField = (key: keyof Brand, value: string | number) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirm = async () => {
		if (window.confirm("คุณต้องการยืนยันการแก้ไขข้อมูลแบรนด์นี้ใช่หรือไม่?")) {
			try {
				await updateBrand(brand.id, editData as Brand);
				// Success toast is handled by useEffect after store update
				setIsEditing(false);
			} catch {
				showErrorToast("ไม่สามารถอัปเดตแบรนด์ได้"); 
			}
		}
	};

	const handleDelete = async (id: number) => {
		if (window.confirm("คุณต้องการลบแบรนด์นี้ใช่หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้")) {
			try {
				await removeBrand(id);
				// Success toast is handled by useEffect after store update
			} catch {
				showErrorToast("ไม่สามารถลบแบรนด์ได้");
			}
		}
	};

	const handleCancel = () => {
		setEditData({ ...brand });
		setIsEditing(false);
	};

	return (
		<div className="flex items-center justify-center gap-2">
			{isEditing ? (
				<>
					<Input
						type="text"
						className="h-8 w-auto flex-grow" // Adjusted width
						value={editData.name || ""}
						onChange={(e) => handleChangeField("name", e.target.value)}
						placeholder="ชื่อแบรนด์"
					/>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={handleConfirm}>
						<CheckIcon className="h-4 w-4 text-green-600" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={handleCancel}>
						<XMarkIcon className="h-4 w-4 text-gray-600" />
					</Button>
				</>
			) : (
				<>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={() => setIsEditing(true)}>
						<PencilIcon className="h-4 w-4 text-blue-600" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8"
						onClick={() => handleDelete(brand.id)}>
						<TrashIcon className="h-4 w-4 text-red-600" />
					</Button>
				</>
			)}
		</div>
	);
};

export default BrandDetail;
