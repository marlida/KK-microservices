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
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

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
		<div className="p-4 bg-white shadow rounded-lg">
			<div className="mb-6 flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-700 flex items-center">
					<TagIcon className="w-6 h-6 mr-3 text-blue-600" />
					จัดการหมวดหมู่
				</h2>
				<div className="flex items-center gap-4">
					<CategoryCreate />
					<RefreshButton onRefresh={fetchCategories} />
				</div>
			</div>
			<div className="flex justify-between mb-4">
				<InputFilter value={filter} onChange={setFilter} placeholder="Filter by name" />
				<DropdownFilter options={uniqueDates} value={dateFilter} onChange={setDateFilter} />
			</div>
			<div className="border rounded-md">
				<Table>
					<TableHeader>
						<CategoryTableHeader />
					</TableHeader>
					<TableBody>
						{data.length > 0 ? (
							data.map((category: Category, index: number) => (
								<CategoryDetail
									key={category.id}
									category={category}
									index={index}
								/>
							))
						) : (
							<TableRow>
								<TableCell colSpan={6} className="text-center text-gray-500 py-4">
									No categories found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default CategoryTable;
