import React from "react";
import { Admin } from "@/types";
import { formatDate } from "@/lib/dateUtils";
import AdminRow from "./AdminRow";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface AdminDetailProps {
	admin: Admin;
	index: number;
}

const AdminDetail: React.FC<AdminDetailProps> = ({ admin, index }) => {
	const [editState, setEditState] = React.useState(true);
	
	return (
		<AdminRow isEven={index % 2 === 0}>
			<td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
						{index + 1}
					</span>
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="flex-shrink-0 h-8 w-8">
						<div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
							<span className="text-sm font-medium text-white">
								{admin.name ? admin.name.charAt(0).toUpperCase() : "?"}
							</span>
						</div>
					</div>
					<div className="ml-3">
						<input
							type="text"
							className={`text-sm font-medium text-gray-900 rounded px-4 py-2 ${
								editState ? "bg-gray-100" : "bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
							}`}
							defaultValue={admin.name || "-"}
							onChange={(e) => console.log("Updated name:", e.target.value)}
							disabled={editState}
						/>
					</div>
				</div>
			</td>
			<td className="flex justify-center px-6 py-4 whitespace-nowrap border-r border-gray-200">
				<input
					type="text"
					className={`text-center px-2.5 py-2 rounded-full text-xs font-medium ${
						admin.tel ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
					}`}
					defaultValue={admin.tel || "No phone"}
					onChange={(e) => console.log("Updated tel:", e.target.value)}
					disabled={editState}
				/>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
					{formatDate(admin.createdAt)}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">
				<div className="flex items-center justify-center">
					<div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
					{formatDate(admin.updatedAt)}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
				<div className="flex items-center justify-center gap-8">
					<button className="text-blue-600 hover:text-blue-800 transition-colors duration-200" onClick={() => setEditState(!editState)}>
						<PencilIcon className="w-5 h-5" />
					</button>
					<button className="text-red-600 hover:text-red-800 transition-colors duration-200">
						<TrashIcon className="w-5 h-5" />
					</button>
				</div>
			</td>
		</AdminRow>
	);
};

export default AdminDetail;
