import { FC } from "react";
import {
	CubeIcon,
	CurrencyDollarIcon,
	ArrowPathIcon,
	CogIcon,
	HashtagIcon,
	DocumentTextIcon,
	ArchiveBoxIcon,
	ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

const ProductTableHeader: FC = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
					<div className="flex items-center justify-center">
						<span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-blue-600 text-xs font-bold">
							#
						</span>
						ลำดับ
					</div>
				</TableHead>
				<TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
					<div className="flex items-center justify-center">
						<CubeIcon className="w-5 h-5 mr-2 text-blue-500" />
						ชื่อสินค้า
					</div>
				</TableHead>
				<TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
					<div className="flex items-center justify-center">
						<CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-500" />
						ราคา
					</div>
				</TableHead>
				<TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
					<div className="flex items-center justify-center">
						<HashtagIcon className="w-5 h-5 mr-2 text-indigo-500" />
						Serial
					</div>
				</TableHead>
				<TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
					<div className="flex items-center justify-center">
						<DocumentTextIcon className="w-5 h-5 mr-2 text-gray-500" />
						รายละเอียด
					</div>
				</TableHead>
				<TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
					<div className="flex items-center justify-center">
						<ArchiveBoxIcon className="w-5 h-5 mr-2 text-yellow-500" />
						จำนวน
					</div>
				</TableHead>
				<TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
					<div className="flex items-center justify-center">
						<ShoppingCartIcon className="w-5 h-5 mr-2 text-red-500" />
						ขายแล้ว
					</div>
				</TableHead>
				<TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r">
					<div className="flex items-center justify-center">
						<ArrowPathIcon className="w-5 h-5 mr-2 text-orange-500" />
						วันที่เพิ่ม
					</div>
				</TableHead>
				<TableHead className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
					<div className="flex items-center justify-center">
						<CogIcon className="w-5 h-5 mr-2 text-orange-500" />
						จัดการ
					</div>
				</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default ProductTableHeader;
