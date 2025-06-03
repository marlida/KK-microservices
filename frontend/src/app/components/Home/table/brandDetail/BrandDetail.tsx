import { FC, useState } from "react";
import { Brand } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import GlobalRow from "../GlobalRow";
import {
	PencilIcon,
	TrashIcon,
	CheckIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { useBrandStore } from "@/store";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

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
			showErrorToast("Update failed. Please try again.");
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await removeBrand(id);
			showSuccessToast(message);
		} catch {
			showErrorToast("Delete failed. Please try again.");
		}
	};

	return (
		<GlobalRow isEven={index % 2 === 0}>
			{/* Index */}
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
						{index + 1}
					</span>
				</div>
			</td>

			{/* Brand Name */}
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-around">
					<div className="flex-shrink-0 h-8 w-8">
						<div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
							<span className="text-sm font-medium text-white">
								{brand.name ? brand.name.charAt(0).toUpperCase() : "?"}
							</span>
						</div>
					</div>
					<div className="ml-3">
						<input
							type="text"
							className={`text-sm font-normal border text-gray-700 rounded px-4 py-1 ${
								editState
									? "border-transparent bg-transparent"
									: "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
							}`}
							value={editData.name || ""}
							onChange={(e) => handleChangeField("name", e.target.value)}
							disabled={editState}
						/>
					</div>
				</div>
			</td>

			{/* Created At */}
			<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
					{formatDate(brand.createdAt)}
				</div>
			</td>

			{/* Updated At */}
			<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
					{formatDate(brand.updatedAt)}
				</div>
			</td>

			{/* Actions */}
			<td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
				<div className="flex items-center justify-center gap-8">
					{editState ? (
						<>
							<button
								className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
								onClick={() => {
									setEditData({ ...brand });
									setEditState(false);
								}}
							>
								<PencilIcon className="w-5 h-5 stroke-2" />
							</button>
							<button
								className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
								onClick={() => handleDelete(brand.id)}
							>
								<TrashIcon className="w-5 h-5 stroke-2" />
							</button>
						</>
					) : (
						<>
							<button
								className="text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer"
								onClick={handleConfirm}
							>
								<CheckIcon className="w-5 h-5 stroke-4" />
							</button>
							<button
								className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
								onClick={() => {
									setEditState(true);
									setEditData({ ...brand });
								}}
							>
								<XMarkIcon className="w-5 h-5 stroke-4" />
							</button>
						</>
					)}
				</div>
			</td>
		</GlobalRow>
	);
};

export default BrandDetail;
