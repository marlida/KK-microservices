import { useEffect, useState } from "react";
import { useBrandStore } from "@/store";
import { Brand } from "@/types";
import { TagIcon } from "@heroicons/react/24/outline";
import BrandDetail from "./brandDetail/BrandDetail";
import BrandTableHeader from "./brandDetail/BrandTableHeader";
import { showSuccessToast } from "@/lib/toast";
import RefreshButton from "../../RefreshButton";
import BrandCreate from "./brandDetail/BrandCreate";
import { InputFilter, DropdownFilter } from "../InputFilter";
import { formatDate } from "@/lib/dateUtils";

const BrandTable = () => {
	const [filter, setFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");

	const brands = useBrandStore((state) => state.brands);
	const fetchBrands = useBrandStore((state) => state.fetchBrands);

	const uniqueDates = Array.from(
		new Set(brands?.data?.map((brand) => formatDate(brand.createdAt))),
	);

	const data =
		brands?.data?.filter(
			(brand) =>
				brand.name?.toLowerCase().includes(filter.toLowerCase()) &&
				(!dateFilter || formatDate(brand.createdAt) === dateFilter),
		) || [];

	const message = brands?.message;

	useEffect(() => {
		if (message) {
			showSuccessToast(message);
		}
	}, [message]);

	return (
		<div className="p-4 bg-white shadow">
			<div className="mb-6 flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-700 mb-3 flex items-center">
					<TagIcon className="w-6 h-6 mr-3 text-blue-600" />
					จัดการแบรนด์
				</h2>
				<div className="flex items-center gap-4">
					<BrandCreate />
					<RefreshButton onRefresh={fetchBrands} />
				</div>
			</div>
			<div className="flex justify-between">
				<InputFilter value={filter} onChange={setFilter} placeholder="Filter by name" />
				<DropdownFilter options={uniqueDates} value={dateFilter} onChange={setDateFilter} />
			</div>
			<div className="border-1 border-gray-200">
				<table className="w-full divide-y divide-gray-300 ">
					<BrandTableHeader />
					<tbody className="bg-white divide-y divide-gray-100 cursor-pointer">
						{data.map((brand: Brand, index: number) => (
							<BrandDetail key={brand.id} brand={brand} index={index} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default BrandTable;
