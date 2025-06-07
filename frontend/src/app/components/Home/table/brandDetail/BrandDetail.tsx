import { FC, useState } from "react";
import { Brand } from "@/types";
import { formatDate } from "@/lib/dateUtils";
// import GlobalRow from "../GlobalRow"; // Removed unused import
import {
	PencilIcon,
	TrashIcon,
	CheckIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { useBrandStore } from "@/store";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { TableCell, TableRow } from "@/components/ui/table"; // Added imports
import { Button } from "@/components/ui/button"; // Added import
import { Input } from "@/components/ui/input"; // Added import

interface BrandDetailProps {
	brand: Brand;
	index: number;
}

const BrandDetail: FC<BrandDetailProps> = ({ brand, index }) => {
	const [editState, setEditState] = useState(true);
	const [editData, setEditData] = useState<Brand>({ ...brand });
	const updateBrand = useBrandStore((state) => state.updateBrand);
	const removeBrand = useBrandStore((state) => state.removeBrand);
	const message = useBrandStore((state) => state.brands.message);

	const handleChangeField = (key: keyof Brand, value: string | number) => {
		setEditData((prev) => ({ ...prev, [key]: value }));
	};

	const handleConfirm = async () => {
		try {
			await updateBrand(brand.id, editData);
			showSuccessToast(message);
			setEditState(true);
		} catch {
			showErrorToast("การอัปเดตล้มเหลว กรุณาลองใหม่อีกครั้ง");
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await removeBrand(id);
			showSuccessToast(message);
		} catch {
			showErrorToast("การลบล้มเหลว กรุณาลองใหม่อีกครั้ง");
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

			{/* Brand Name */}
			<TableCell className="border-r">
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center shrink-0">
						<span className="text-sm font-medium text-white">
							{brand.name ? brand.name.charAt(0).toUpperCase() : "?"}
						</span>
					</div>
					{editState ? (
						<p
							className="text-sm text-gray-800 truncate"
							title={brand.name}
						>
							{brand.name || "-"}
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

			{/* Created At */}
			<TableCell className="text-center text-sm text-gray-600 border-r">
				{formatDate(brand.createdAt)}
			</TableCell>

			{/* Updated At */}
			<TableCell className="text-center text-sm text-gray-600 border-r">
				{formatDate(brand.updatedAt)}
			</TableCell>

			{/* Actions */}
			<TableCell className="text-center">
				{editState ? (
					<div className="flex items-center justify-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => setEditState(false)}
						>
							<PencilIcon className="h-4 w-4 text-blue-600" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => handleDelete(brand.id)}
						>
							<TrashIcon className="h-4 w-4 text-red-600" />
						</Button>
					</div>
				) : (
					<div className="flex items-center justify-center gap-2">
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={handleConfirm}
						>
							<CheckIcon className="h-4 w-4 text-green-600" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8"
							onClick={() => {
								setEditData({ ...brand }); // Reset changes
								setEditState(true);
							}}
						>
							<XMarkIcon className="h-4 w-4 text-gray-600" />
						</Button>
					</div>
				)}
			</TableCell>
		</TableRow>
	);
};

export default BrandDetail;
