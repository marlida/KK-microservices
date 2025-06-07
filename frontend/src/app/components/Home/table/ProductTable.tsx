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
import ProductExport from "./productDetail/ProductExport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableFooter } from "@/components/ui/table";

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
		<Card className="m-4">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="text-2xl font-bold text-gray-700 flex items-center">
						<CubeIcon className="w-6 h-6 mr-3 text-blue-600" />
						จัดการสินค้า
					</CardTitle>
					<div className="flex items-center gap-4">
						<ProductExport />
						<ProductCreate />
						<RefreshButton onRefresh={fetchProducts} />
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between mb-4">
					<InputFilter value={filter} onChange={setFilter} placeholder="Filter by name" />
					<DropdownFilter options={uniqueDates} value={dateFilter} onChange={setDateFilter} />
				</div>
				<div className="border rounded-md">
					<Table>
						<ProductTableHeader />
						<TableBody className="bg-white divide-y divide-gray-100 cursor-pointer">
							{data.map((product: Product, index: number) => (
								<ProductDetail key={product.id} product={product} index={index} />
							))}
						</TableBody>
						{data.length === 0 && (
							<TableFooter>
								<tr>
									<td colSpan={9} className="text-center text-gray-500 py-4">
										<p>ไม่พบสินค้า</p>
									</td>
								</tr>
							</TableFooter>
						)}
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductTable;
