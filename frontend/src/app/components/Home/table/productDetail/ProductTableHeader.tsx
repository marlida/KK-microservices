import { FC } from "react";
import {
	CubeIcon,
	CurrencyDollarIcon,
	// ClockIcon,
	ArrowPathIcon,
	CogIcon,
	HashtagIcon,
	DocumentTextIcon,
	ArchiveBoxIcon,
	ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const ProductTableHeader: FC = () => {
	return (
		<thead>
			<tr>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-blue-600 text-xs font-bold">
							#
						</span>
						ลำดับ
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<CubeIcon className="w-5 h-5 mr-2 text-blue-500" />
						ชื่อสินค้า
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-500" />
						ราคา
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<HashtagIcon className="w-5 h-5 mr-2 text-indigo-500" />
						Serial
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<DocumentTextIcon className="w-5 h-5 mr-2 text-gray-500" />
						รายละเอียด
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<ArchiveBoxIcon className="w-5 h-5 mr-2 text-yellow-500" />
						จำนวน
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<ShoppingCartIcon className="w-5 h-5 mr-2 text-red-500" />
						ขายแล้ว
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<ArrowPathIcon className="w-5 h-5 mr-2 text-orange-500" />
						Updated At
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
					<div className="flex items-center justify-center">
						<CogIcon className="w-5 h-5 mr-2 text-orange-500" />
						Management
					</div>
				</th>
			</tr>
		</thead>
	);
};

export default ProductTableHeader;
