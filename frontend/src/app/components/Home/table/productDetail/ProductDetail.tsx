import { FC, useState } from "react";
import { formatDate } from "@/lib/dateUtils";
import GlobalRow from "../GlobalRow";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useProductStore } from "@/store";
import { showSuccessToast } from "@/lib/toast";
import { Product } from "@/types";

interface ProductDetailProps {
	product: Product;
	index: number;
}

const ProductDetail: FC<ProductDetailProps> = ({ product, index }) => {
	const [editState, setEditState] = useState(true);
	const [editData, setEditData] = useState<Product>(product);
	const updateProduct = useProductStore((state) => state.updateProduct);
	const removeProduct = useProductStore((state) => state.removeProduct);
	const message = useProductStore((state) => state.products.message);

	const handleChangeField = (key: keyof Product, value: string | number) => {
		setEditData({ ...editData, [key]: value });
	};

	const handleConfirm = async () => {
		try {
			await updateProduct(product.id, editData);
			showSuccessToast(message);
			setEditState(true);
		} catch {
			showSuccessToast(message);
		}
	};

	const handleDelete = async (id: number) => {
		await removeProduct(id);
		showSuccessToast(message);
	};

	return (
		<GlobalRow isEven={index % 2 === 0}>
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
						{index + 1}
					</span>
				</div>
			</td>
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<input
						type="text"
						className={`w-full text-sm font-medium border text-gray-700 rounded px-4 py-1 text-center ${
							!editState
								? "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								: "border-gray-100/0"
						}`}
						value={editData.name || ""}
						onChange={(e) => handleChangeField("name", e.target.value)}
						disabled={editState}
					/>
				</div>
			</td>
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<input
						type="number"
						className={`w-full text-sm font-medium border text-gray-700 rounded px-4 py-1 text-center ${
							!editState
								? "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								: "border-gray-100/0"
						}`}
						value={editData.price || ""}
						onChange={(e) => handleChangeField("price", parseFloat(e.target.value))}
						disabled={editState}
					/>
				</div>
			</td>
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<input
						type="text"
						className={`w-full text-sm font-medium border text-gray-700 rounded px-4 py-1 text-center ${
							!editState
								? "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								: "border-gray-100/0"
						}`}
						value={editData.serial || ""}
						onChange={(e) => handleChangeField("serial", e.target.value)}
						disabled={editState}
					/>
				</div>
			</td>
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<input
						type="text"
						className={`w-full text-sm font-medium border text-gray-700 rounded px-4 py-1 text-center ${
							!editState
								? "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								: "border-gray-100/0"
						}`}
						value={editData.description || ""}
						onChange={(e) => handleChangeField("description", e.target.value)}
						disabled={editState}
					/>
				</div>
			</td>
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<input
						type="number"
						className={`w-full text-sm font-medium border text-gray-700 rounded px-4 py-1 text-center ${
							!editState
								? "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								: "border-gray-100/0"
						}`}
						value={editData.quantity || ""}
						onChange={(e) => handleChangeField("quantity", parseInt(e.target.value))}
						disabled={editState}
					/>
				</div>
			</td>
			<td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<input
						type="number"
						className={`w-full text-sm font-medium border text-gray-700 rounded px-4 py-1 text-center ${
							!editState
								? "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								: "border-gray-100/0"
						}`}
						value={editData.sold ? editData.sold : 0}
						onChange={(e) => handleChangeField("sold", parseInt(e.target.value))}
						disabled={editState}
					/>
				</div>
			</td>
			<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
					{formatDate(product.createdAt)}
				</div>
			</td>
			<td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
				<div className="flex items-center justify-center gap-8">
					{editState ? (
						<>
							<button
								className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer"
								onClick={() => {
									setEditData(product);
									setEditState(false);
								}}>
								<PencilIcon className="w-5 h-5 stroke-2" />
							</button>
							<button
								className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
								onClick={() => handleDelete(product.id)}>
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
									setEditData(product);
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

export default ProductDetail;
