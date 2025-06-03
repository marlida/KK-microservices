import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store";
import { Category } from "@/types";
import { TagIcon } from "@heroicons/react/24/outline";
import CategoryDetail from "./categoryDetail/CategoryDetail";
import CategoryTableHeader from "./categoryDetail/CategoryTableHeader";
import { showSuccessToast } from "@/lib/toast";
import RefreshButton from "../../RefreshButton";
import CategoryCreate from "./categoryDetail/CategoryCreate";
import { InputFilter, DropdownFilter } from "../InputFilter";
import { formatDate } from "@/lib/dateUtils";

const CategoryTable = () => {
	const [filter, setFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");

	const categories = useCategoryStore((state) => state.categories);
	const fetchCategories = useCategoryStore((state) => state.fetchCategories);

	const uniqueDates = Array.from(
		new Set(categories?.data?.map((category) => formatDate(category.createdAt))),
	);

	const data =
		categories?.data?.filter(
			(category) =>
				category.name?.toLowerCase().includes(filter.toLowerCase()) &&
				(!dateFilter || formatDate(category.createdAt) === dateFilter),
		) || [];

	const message = categories?.message;

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
					จัดการหมวดหมู่
				</h2>
				<div className="flex items-center gap-4">
					<CategoryCreate />
					<RefreshButton onRefresh={fetchCategories} />
				</div>
			</div>
			<div className="flex justify-between">
				<InputFilter value={filter} onChange={setFilter} placeholder="Filter by name" />
				<DropdownFilter options={uniqueDates} value={dateFilter} onChange={setDateFilter} />
			</div>
			<div className="border-1 border-gray-200">
				<table className="w-full divide-y divide-gray-300 ">
					<CategoryTableHeader />
					<tbody className="bg-white divide-y divide-gray-100 cursor-pointer">
						{data.map((category: Category, index: number) => (
							<CategoryDetail key={category.id} category={category} index={index} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CategoryTable;
