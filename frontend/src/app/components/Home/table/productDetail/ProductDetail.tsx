import { FC, useState, useEffect } from "react";
import { formatDate } from "@/lib/dateUtils";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useProductStore } from "@/store";
import { Product } from "@/types";
import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductDetailProps {
	product: Product;
	index: number;
}

const ProductDetail: FC<ProductDetailProps> = ({ product, index }) => {
	const [editState, setEditState] = useState(true);
	const [editData, setEditData] = useState<Product>(product);
	const updateProduct = useProductStore((state) => state.updateProduct);
	const removeProduct = useProductStore((state) => state.removeProduct);

	useEffect(() => {
		setEditData(product);
	}, [product]);

	const handleChangeField = (key: keyof Product, value: string | number) => {
		setEditData({ ...editData, [key]: value });
	};

	const handleConfirm = async () => {
		try {
			await updateProduct(product.id, editData);
			setEditState(true);
		} catch (error) {
			console.error("Update failed:", error);
		}
	};

	const handleCancel = () => {
		setEditData(product);
		setEditState(true);
	};

	const handleDelete = async (id: number) => {
		try {
			await removeProduct(id);
		} catch (error) {
			console.error("Update failed:", error);
		}
	};

	return (
		<TableRow className={index % 2 === 0 ? "bg-accent" : ""}>
			<TableCell className="px-6 py-2 whitespace-nowrap border-r">
				<div className="flex items-center justify-center">
					<span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
						{index + 1}
					</span>
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap border-r">
				<div className="flex items-center justify-center">
					<Input
						type="text"
						className={`w-full text-sm font-medium text-center ${
							!editState
								? "bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
								: "border-transparent bg-transparent read-only:focus:ring-0 read-only:ring-0 read-only:border-transparent read-only:cursor-default"
						}`}
						value={editData.name || ""}
						onChange={(e) => handleChangeField("name", e.target.value)}
						readOnly={editState}
					/>
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap border-r">
				<div className="flex items-center justify-center">
					<Input
						type="number"
						className={`w-full text-sm font-medium text-center ${
							!editState
								? "bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
								: "border-transparent bg-transparent read-only:focus:ring-0 read-only:ring-0 read-only:border-transparent read-only:cursor-default"
						}`}
						value={editData.price || ""}
						onChange={(e) => handleChangeField("price", parseFloat(e.target.value))}
						readOnly={editState}
					/>
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap border-r">
				<div className="flex items-center justify-center">
					<Input
						type="text"
						className={`w-full text-sm font-medium text-center ${
							!editState
								? "bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
								: "border-transparent bg-transparent read-only:focus:ring-0 read-only:ring-0 read-only:border-transparent read-only:cursor-default"
						}`}
						value={editData.serial || ""}
						onChange={(e) => handleChangeField("serial", e.target.value)}
						readOnly={editState}
					/>
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap border-r">
				<div className="flex items-center justify-center">
					<Input
						type="text"
						className={`w-full text-sm font-medium text-center ${
							!editState
								? "bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
								: "border-transparent bg-transparent read-only:focus:ring-0 read-only:ring-0 read-only:border-transparent read-only:cursor-default"
						}`}
						value={editData.description || ""}
						onChange={(e) => handleChangeField("description", e.target.value)}
						readOnly={editState}
					/>
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap border-r">
				<div className="flex items-center justify-center">
					<Input
						type="number"
						className={`w-full text-sm font-medium text-center ${
							!editState
								? "bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
								: "border-transparent bg-transparent read-only:focus:ring-0 read-only:ring-0 read-only:border-transparent read-only:cursor-default"
						}`}
						value={editData.quantity || ""}
						onChange={(e) => handleChangeField("quantity", parseInt(e.target.value))}
						readOnly={editState}
					/>
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap border-r">
				<div className="flex items-center justify-center">
					<Input
						type="number"
						className={`w-full text-sm font-medium text-center ${
							!editState
								? "bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
								: "border-transparent bg-transparent read-only:focus:ring-0 read-only:ring-0 read-only:border-transparent read-only:cursor-default"
						}`}
						value={editData.sold ? editData.sold : 0}
						onChange={(e) => handleChangeField("sold", parseInt(e.target.value))}
						readOnly={editState}
					/>
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 border-r">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
					{formatDate(product.createdAt)}
				</div>
			</TableCell>
			<TableCell className="px-6 py-2 whitespace-nowrap text-sm font-medium">
				<div className="flex items-center justify-center gap-2">
					{editState ? (
						<>
							<Button
								variant="ghost"
								size="icon"
								className="text-blue-600 hover:text-blue-800"
								onClick={() => {
									setEditData(product);
									setEditState(false);
								}}>
								<PencilIcon className="w-5 h-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="text-red-600 hover:text-red-800"
								onClick={() => handleDelete(product.id)}>
								<TrashIcon className="w-5 h-5" />
							</Button>
						</>
					) : (
						<>
							<Button
								variant="ghost"
								size="icon"
								className="text-green-600 hover:text-green-800"
								onClick={handleConfirm}>
								<CheckIcon className="w-5 h-5 stroke-2" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="text-red-600 hover:text-red-800"
								onClick={handleCancel}>
								<XMarkIcon className="w-5 h-5 stroke-2" />
							</Button>
						</>
					)}
				</div>
			</TableCell>
		</TableRow>
	);
};

export default ProductDetail;
