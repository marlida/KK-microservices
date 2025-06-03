import { FC, useState } from "react";
import { Brand, Category } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import GlobalRow from "../GlobalRow";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useBrandStore, useCategoryStore } from "@/store";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

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
		<GlobalRow isEven={index % 2 === 0}>
			{/* Index */}
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
						{index + 1}
					</span>
				</div>
			</td>

			{/* Category Name */}
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-around">
					<div className="flex-shrink-0 h-8 w-8">
						<div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
							<span className="text-sm font-medium text-white">
								{category.name ? category.name.charAt(0).toUpperCase() : "?"}
							</span>
						</div>
					</div>
					<div className="ml-3">
						{editState ? (
							<p className="text-sm text-gray-800">{category.name || "-"}</p>
						) : (
							<input
								type="text"
								className="text-sm font-normal border border-gray-300 text-gray-700 rounded px-4 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={editData.name || ""}
								onChange={(e) => handleChangeField("name", e.target.value)}
							/>
						)}
					</div>
				</div>
			</td>

			{/* Brand */}
			<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
					{editState ? (
						<p>{category.brand?.name ?? "-"}</p>
					) : (
						<select
							className="text-sm font-normal border border-gray-300 text-gray-700 rounded px-4 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={editData.brandId || ""}
							onChange={(e) => handleChangeField("brandId", Number(e.target.value))}>
							<option value="">Select a brand</option>
							{brands.map((brand) => (
								<option key={brand.id} value={brand.id}>
									{brand.name}
								</option>
							))}
						</select>
					)}
				</div>
			</td>

			{/* Created At */}
			<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
					{formatDate(category.createdAt)}
				</div>
			</td>

			{/* Updated At */}
			<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
					{formatDate(category.updatedAt)}
				</div>
			</td>

			{/* Action */}
			<td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
				<div className="flex items-center justify-center gap-8">
					{editState ? (
						<>
							<button
								className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
								onClick={() => {
									setEditData({ ...category });
									setEditState(false);
								}}>
								<PencilIcon className="w-5 h-5 stroke-2" />
							</button>
							<button
								className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
								onClick={() => handleDelete(category.id)}>
								<TrashIcon className="w-5 h-5 stroke-2" />
							</button>
						</>
					) : (
						<>
							<button
								className="text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer"
								onClick={handleConfirm}>
								<CheckIcon className="w-5 h-5 stroke-4" />
							</button>
							<button
								className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
								onClick={() => {
									setEditState(true);
									setEditData({ ...category });
								}}>
								<XMarkIcon className="w-5 h-5 stroke-4" />
							</button>
						</>
					)}
				</div>
			</td>
		</GlobalRow>
	);
};

export default CategoryDetail;
