import { useState } from "react";
import AdminTable from "./table/AdminTable";
import UserTable from "./table/UserTable";
import BrandTable from "./table/BrandTable";
import CategoryTable from "./table/CategoryTable";
import ProductTable from "./table/ProductTable";
import OrderTable from "./table/OrderTable";
import NavButton from "../NavButton";
import TableIcon from "@heroicons/react/24/outline/TableCellsIcon";

export default function DataOverview() {
	const [activeTable, setActiveTable] = useState<string | null>("Admin");
	const tables = ["Admin", "User", "Brand", "Category", "Product", "Order"];

	return (
		<div className={"bg-white pt-20 w-full min-h-screen duration-500 flex flex-col px-8 "}>
			<div className="flex items-center gap-3 border border-gray-200 shadow-sm rounded-2xl p-10">
				<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
					<TableIcon className="w-6 h-6 text-white" />
				</div>
				<h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Data Overview
				</h2>
				<div className="flex-1 items-center h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
			</div>
			<div>
				<div className="flex flex-wrap gap-4 my-6">
					{tables.map((table) => (
						<NavButton
							key={table}
							label={table}
							onClick={() =>
								setActiveTable((prev) => (prev === table ? null : table))
							}
						/>
					))}
				</div>
				{activeTable === "Admin" && <AdminTable />}
				{activeTable === "User" && <UserTable />}
				{activeTable === "Brand" && <BrandTable />}
				{activeTable === "Category" && <CategoryTable />}
				{activeTable === "Product" && <ProductTable />}
				{activeTable === "Order" && <OrderTable />}
				{!activeTable && (
					<div className="flex flex-col items-center justify-center py-12 mt-40">
						<TableIcon className="w-12 h-12 animate-bounce mb-4 text-blue-500 " />
						<p className="text-lg font-medium">Select a table to view its data</p>
						<p className="text-sm mt-2">
							Choose from the buttons above to explore your data
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
