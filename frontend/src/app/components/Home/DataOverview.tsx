import { useState } from "react";
import AdminTable from "./table/AdminTable";
import UserTable from "./table/UserTable";
import BrandTable from "./table/BrandTable";
import CategoryTable from "./table/CategoryTable";
import ProductTable from "./table/ProductTable";
import OrderTable from "./table/OrderTable";
import NavButton from "../NavButton";
import CubeIcon from "@heroicons/react/24/outline/TableCellsIcon";
import BannerHeader from "./table/BannerHeader";

export default function DataOverview() {
	const [activeTable, setActiveTable] = useState<string | null>("Admin");
	const tables = ["ผู้ดูแลระบบ", "ผู้ใช้", "แบรนด์", "หมวดหมู่", "สินค้า", "รายการซ่อม"];

	return (
		<div className={"bg-white pt-20 w-full min-h-screen duration-500 flex flex-col px-8 "}>
			<BannerHeader activeTable={activeTable}/>
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
				{activeTable === "ผู้ดูแลระบบ" && <AdminTable />}
				{activeTable === "ผู้ใช้" && <UserTable />}
				{activeTable === "แบรนด์" && <BrandTable />}
				{activeTable === "หมวดหมู่" && <CategoryTable />}
				{activeTable === "สินค้า" && <ProductTable />}
				{activeTable === "รายการซ่อม" && <OrderTable />}
				{!activeTable && (
					<div className="flex flex-col items-center justify-center py-12 mt-40">
						<CubeIcon className="w-12 h-12 animate-bounce mb-4 text-blue-500" />
						<p className="font-medium text-lg text-gray-700">
							เลือกตารางเพื่อดูข้อมูล
						</p>
						<p className="text-sm mt-2 text-gray-500">
							คลิกที่ปุ่มด้านบนเพื่อสำรวจข้อมูลของคุณ
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
