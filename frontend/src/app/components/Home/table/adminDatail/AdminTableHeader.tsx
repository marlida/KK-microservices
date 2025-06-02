import { FC } from "react";
import {
	UserIcon,
	PhoneIcon,
	ClockIcon,
	ArrowPathIcon,
	CogIcon,
} from "@heroicons/react/24/outline";

const AdminTableHeader: FC = () => {
	return (
		<thead className="bg-gradient-to-r from-gray-50 to-gray-100">
			<tr>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-blue-600 text-xs font-bold">
							#
						</span>
						ID
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<UserIcon className="w-5 h-5 mr-2 text-blue-500" />
						Name
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<PhoneIcon className="w-5 h-5 mr-2 text-green-500" />
						Tel
					</div>
				</th>
				<th
					scope="col"
					className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
					<div className="flex items-center justify-center">
						<ClockIcon className="w-5 h-5 mr-2 text-purple-500" />
						Created At
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

export default AdminTableHeader;
