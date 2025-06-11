import { FC, useState, useEffect, ReactNode } from "react";
import { Product } from "@/types";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useProductStore, useBrandStore, useCategoryStore } from "@/store";
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

interface ProductDetailProps {
	product: Product;
}

const ProductDetail: FC<ProductDetailProps> = ({ product }): ReactNode => {
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<Product>({ ...product });
	const updateProduct = useProductStore((state) => state.updateProduct);
	const removeProduct = useProductStore((state) => state.removeProduct);
	const productMessage = useProductStore((state) => state.products.message);

	const brands = useBrandStore((state) => state.brands.data);
	const categories = useCategoryStore((state) => state.categories.data);

	useEffect(() => {
		setEditData({ ...product });
	}, [product]);

	const handleChangeField = (key: keyof Product, value: string | number | null) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirm = async () => {
		if (
			!editData.name ||
			!editData.price ||
			!editData.quantity ||
			!editData.brandId ||
			!editData.categoryId
		) {
			showErrorToast("กรุณากรอกข้อมูลสินค้าให้ครบถ้วน");
			return;
		}
		try {
			const payload: Product = {
				...editData,
				price: Number(editData.price),
				quantity: Number(editData.quantity),
				sold: Number(editData.sold),
				brandId: Number(editData.brandId),
				categoryId: Number(editData.categoryId),
			};
			await updateProduct(product.id, payload);
			showSuccessToast(productMessage || "อัปเดตสินค้าสำเร็จ!");
			setIsEditing(false);
		} catch (error) {
			console.error("ล้มเหลวในการอัปเดตสินค้า:", error);
			showErrorToast(productMessage || "ล้มเหลวในการอัปเดตสินค้า กรุณาลองใหม่อีกครั้ง");
		}
	};

	const handleDelete = async () => {
		if (window.confirm("คุณต้องการยืนยันการลบข้อมูลสินค้านี้ใช่หรือไม่?")) {
			try {
				await removeProduct(product.id);
				showSuccessToast(productMessage || "ลบสินค้าสำเร็จ!");
			} catch (error) {
				console.error("ล้มเหลวในการลบสินค้า:", error);
				showErrorToast(productMessage || "ล้มเหลวในการลบสินค้า กรุณาลองใหม่อีกครั้ง");
			}
		}
	};

	const handleCancelEdit = () => {
		setEditData({ ...product });
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
						<AlertDialogTitle>แก้ไขข้อมูลสินค้า</AlertDialogTitle>
						<AlertDialogDescription>
							แก้ไขรายละเอียดสินค้าด้านล่างนี้ คลิก &quot;บันทึก&quot;
							เพื่อยืนยันการเปลี่ยนแปลง
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="name" className="text-right">
								ชื่อสินค้า
							</label>
							<Input
								id="name"
								type="text"
								placeholder="ชื่อสินค้า"
								value={editData.name ?? ""}
								onChange={(e) => handleChangeField("name", e.target.value)}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="price" className="text-right">
								ราคา
							</label>
							<Input
								id="price"
								type="number"
								placeholder="ราคา"
								value={editData.price ?? ""}
								onChange={(e) =>
									handleChangeField(
										"price",
										e.target.value ? parseFloat(e.target.value) : null,
									)
								}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="serial" className="text-right">
								ซีเรียล
							</label>
							<Input
								id="serial"
								type="text"
								placeholder="ซีเรียล"
								value={editData.serial ?? ""}
								onChange={(e) => handleChangeField("serial", e.target.value)}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="description" className="text-right">
								รายละเอียด
							</label>
							<Input
								id="description"
								type="text"
								placeholder="รายละเอียด"
								value={editData.description ?? ""}
								onChange={(e) => handleChangeField("description", e.target.value)}
								className="col-span-3 h-8 text-sm"
							/>
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
							<label htmlFor="sold" className="text-right">
								ขายแล้ว
							</label>
							<Input
								id="sold"
								type="number"
								placeholder="ขายแล้ว"
								value={editData.sold ?? 0}
								onChange={(e) =>
									handleChangeField(
										"sold",
										e.target.value ? parseInt(e.target.value) : 0,
									)
								}
								className="col-span-3 h-8 text-sm"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="brandId" className="text-right">
								แบรนด์
							</label>
							<Select
								value={editData.brandId?.toString() ?? ""}
								onValueChange={(value) =>
									handleChangeField("brandId", value ? parseInt(value) : null)
								}>
								<SelectTrigger className="col-span-3 h-8 text-sm">
									<SelectValue placeholder="เลือกแบรนด์" />
								</SelectTrigger>
								<SelectContent>
									{brands?.map((brand) => (
										<SelectItem key={brand.id} value={brand.id.toString()}>
											{brand.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="categoryId" className="text-right">
								หมวดหมู่
							</label>
							<Select
								value={editData.categoryId?.toString() ?? ""}
								onValueChange={(value) =>
									handleChangeField("categoryId", value ? parseInt(value) : null)
								}>
								<SelectTrigger className="col-span-3 h-8 text-sm">
									<SelectValue placeholder="เลือกหมวดหมู่" />
								</SelectTrigger>
								<SelectContent>
									{categories?.map((category) => (
										<SelectItem
											key={category.id}
											value={category.id.toString()}>
											{category.name}
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

export default ProductDetail;
