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
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

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
		<div className="p-4 bg-white shadow rounded-lg">
			<div className="mb-6 flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-700 flex items-center">
					<TagIcon className="w-6 h-6 mr-3 text-blue-600" />
					จัดการแบรนด์
				</h2>
				<div className="flex items-center gap-4">
					<BrandCreate />
					<RefreshButton onRefresh={fetchBrands} />
				</div>
			</div>
			<div className="flex justify-between mb-4">
				<InputFilter value={filter} onChange={setFilter} placeholder="Filter by name" />
				<DropdownFilter options={uniqueDates} value={dateFilter} onChange={setDateFilter} />
			</div>
			<div className="border rounded-md">
				<Table>
					<TableHeader>
						<BrandTableHeader />
					</TableHeader>
					<TableBody>
						{data.length > 0 ? (
							data.map((brand: Brand, index: number) => (
								<BrandDetail key={brand.id} brand={brand} index={index} />
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className="text-center text-gray-500 py-4">
									No brands found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default BrandTable;
