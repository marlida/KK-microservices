import { FC, useState, useEffect, ReactNode } from "react";
import { Brand, Category } from "@/types";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useBrandStore, useCategoryStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { showSuccessToast, showErrorToast } from "@/lib/toast";

interface CategoryDetailProps {
	category: Category;
}

const CategoryDetail: FC<CategoryDetailProps> = ({ category }): ReactNode => {
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<Partial<Category>>({ ...category });
	const brands: Brand[] = useBrandStore((state) => state.brands.data);
	const updateCategory = useCategoryStore((state) => state.updateCategory);
	const removeCategory = useCategoryStore((state) => state.removeCategory);
	const categoryMessage = useCategoryStore((state) => state.categories.message);

	useEffect(() => {
		setEditData({ ...category });
	}, [category]);

	const handleChangeField = (key: keyof Category, value: string | number) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirm = async () => {
		if (!editData.name || !editData.brandId) {
			showErrorToast("กรุณากรอกข้อมูลหมวดหมู่ให้ครบถ้วน");
			return;
		}
		try {
			await updateCategory(category.id, editData as Category);
			showSuccessToast(categoryMessage || "อัปเดตหมวดหมู่สำเร็จ!");
			setIsEditing(false);
		} catch (error) {
			console.error("ล้มเหลวในการอัปเดตหมวดหมู่:", error);
			showErrorToast(categoryMessage || "ล้มเหลวในการอัปเดตหมวดหมู่ กรุณาลองใหม่อีกครั้ง");
		}
	};

	const handleDelete = async () => {
		if (window.confirm("คุณต้องการยืนยันการลบข้อมูลหมวดหมู่นี้ใช่หรือไม่?")) {
			try {
				await removeCategory(category.id);
				showSuccessToast(categoryMessage || "ลบหมวดหมู่สำเร็จ!");
			} catch (error) {
				console.error("ล้มเหลวในการลบหมวดหมู่:", error);
				showErrorToast(categoryMessage || "ล้มเหลวในการลบหมวดหมู่ กรุณาลองใหม่อีกครั้ง");
			}
		}
	};

	const handleCancelEdit = () => {
		setEditData({ ...category });
		setIsEditing(false); // Close the dialog
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
				<AlertDialogContent className="sm:max-w-[600px]">
					<AlertDialogHeader>
						<AlertDialogTitle>แก้ไขข้อมูลหมวดหมู่</AlertDialogTitle>
						<AlertDialogDescription>
							แก้ไขรายละเอียดหมวดหมู่ด้านล่างนี้ คลิก &quot;บันทึก&quot;
							เพื่อยืนยันการเปลี่ยนแปลง
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="name" className="text-right">
								ชื่อหมวดหมู่
							</label>
							<Input
								id="name"
								type="text"
								placeholder="ชื่อหมวดหมู่"
								value={editData.name || ""}
								onChange={(e) => handleChangeField("name", e.target.value)}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="brandId" className="text-right">
								แบรนด์
							</label>
							<Select
								value={editData.brandId?.toString() || ""}
								onValueChange={(value) =>
									handleChangeField("brandId", Number(value))
								}>
								<SelectTrigger className="col-span-3 h-8 text-sm">
									<SelectValue placeholder="เลือกแบรนด์" />
								</SelectTrigger>
								<SelectContent>
									{brands.map((brand) => (
										<SelectItem key={brand.id} value={brand.id.toString()}>
											{brand.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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

export default CategoryDetail;
