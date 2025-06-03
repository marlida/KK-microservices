import { useEffect, useState } from "react";
import { useProductStore } from "@/store";
import { Product } from "@/types";
import { CubeIcon } from "@heroicons/react/24/outline";
import ProductDetail from "./productDetail/ProductDetail";
import ProductTableHeader from "./productDetail/ProductTableHeader";
import { showSuccessToast } from "@/lib/toast";
import RefreshButton from "../../RefreshButton";
import ProductCreate from "./productDetail/ProductCreate";
import { InputFilter, DropdownFilter } from "../InputFilter";
import { formatDate } from "@/lib/dateUtils";

const ProductTable = () => {
	const [filter, setFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");

	const products = useProductStore((state) => state.products);
	const fetchProducts = useProductStore((state) => state.fetchProducts);

	const uniqueDates = Array.from(
		new Set(products?.data?.map((product) => formatDate(product.createdAt))),
	);

	const data =
		products?.data?.filter(
			(product) =>
				product.name?.toLowerCase().includes(filter.toLowerCase()) &&
				(!dateFilter || formatDate(product.createdAt) === dateFilter),
		) || [];

	const message = products?.message;

	useEffect(() => {
		if (message) {
			showSuccessToast(message);
		}
	}, [message]);

	return (
		<div className="p-4 bg-white shadow">
			<div className="mb-6 flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-700 mb-3 flex items-center">
					<CubeIcon className="w-6 h-6 mr-3 text-blue-600" />
					จัดการสินค้า
				</h2>
				<div className="flex items-center gap-4">
					<ProductCreate />
					<RefreshButton onRefresh={fetchProducts} />
				</div>
			</div>
			{/* Filter Input */}
			<div className="flex justify-between">
				<InputFilter value={filter} onChange={setFilter} placeholder="Filter by name" />
				<DropdownFilter options={uniqueDates} value={dateFilter} onChange={setDateFilter} />
			</div>
			{/* Product Table */}
			<div className="border-1 border-gray-200">
				<table className="w-full divide-y divide-gray-300 table-fixed">
					<ProductTableHeader />
					<tbody className="bg-white divide-y divide-gray-100 cursor-pointer">
						{data.map((product: Product, index: number) => (
							<ProductDetail key={product.id} product={product} index={index} />
						))}
					</tbody>
				</table>
			</div>
			{data.length === 0 && (
				<div className="text-center text-gray-500 py-4">
					<p>ไม่พบสินค้า</p>
				</div>
			)}
		</div>
	);
};

export default ProductTable;
