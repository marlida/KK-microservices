import { FC, useState } from "react";
import { Brand, Category } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useBrandStore, useCategoryStore } from "@/store";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface CategoryDetailProps {
	category: Category;
	index: number;
}

const CategoryDetail: FC<CategoryDetailProps> = ({ category, index }) => {
	const [editState, setEditState] = useState(true);
	const [editData, setEditData] = useState<Category>({ ...category });
	const message = useCategoryStore((state) => state.categories.message);
	const brands: Brand[] = useBrandStore((state) => state.brands.data);
	const updateCategory = useCategoryStore((state) => state.updateCategory);
	const removeCategory = useCategoryStore((state) => state.removeCategory);

	const handleChangeField = (key: keyof Category, value: string | number) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirm = async () => {
		try {
			await updateCategory(category.id, editData);
			showSuccessToast(message);
			setEditState(true);
		} catch {
			showErrorToast("Update failed. Please try again.");
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await removeCategory(id);
			showSuccessToast(message);
		} catch {
			showErrorToast("Delete failed. Please try again.");
		}
	};

	return (
		<TableRow className={index % 2 === 1 ? "bg-accent" : ""}>
			{/* Index */}
			<TableCell className="font-medium text-center border-r">
				<span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
					{index + 1}
				</span>
			</TableCell>

			{/* Category Name */}
			<TableCell className="border-r">
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center shrink-0">
						<span className="text-sm font-medium text-white">
							{category.name ? category.name.charAt(0).toUpperCase() : "?"}
						</span>
					</div>
					{editState ? (
						<p className="text-sm text-gray-800 truncate" title={category.name}>
							{category.name || "-"}
						</p>
					) : (
						<Input
							type="text"
							className="h-8"
							value={editData.name || ""}
							onChange={(e) => handleChangeField("name", e.target.value)}
						/>
					)}
				</div>
			</TableCell>

			{/* Brand */}
			<TableCell className="text-center border-r">
				{editState ? (
					<p className="text-sm">{category.brand?.name ?? "-"}</p>
				) : (
					<Select
						value={editData.brandId?.toString() || ""}
						onValueChange={(value) => handleChangeField("brandId", Number(value))}>
						<SelectTrigger className="h-8 text-xs w-full">
							<SelectValue placeholder="Select a brand" />
						</SelectTrigger>
						<SelectContent>
							{brands.map((brand) => (
								<SelectItem key={brand.id} value={brand.id.toString()}>
									{brand.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			</TableCell>

			{/* Created At */}
			<TableCell className="text-center text-sm text-gray-600 border-r">
				{formatDate(category.createdAt)}
			</TableCell>

			{/* Updated At */}
			<TableCell className="text-center text-sm text-gray-600 border-r">
				{formatDate(category.updatedAt)}
			</TableCell>

			{/* Actions */}
			<TableCell className="text-center">
				{editState ? (
					<div className="flex items-center justify-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => setEditState(false)}>
							<PencilIcon className="h-4 w-4 text-blue-600" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => handleDelete(category.id)}>
							<TrashIcon className="h-4 w-4 text-red-600" />
						</Button>
					</div>
				) : (
					<div className="flex items-center justify-center gap-2">
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
							onClick={() => {
								setEditData({ ...category });
								setEditState(true);
							}}>
							<XMarkIcon className="h-4 w-4 text-gray-600" />
						</Button>
					</div>
				)}
			</TableCell>
		</TableRow>
	);
};

export default CategoryDetail;
