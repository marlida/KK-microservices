import React from "react";
import { useAdminStore } from "@/store";
import { Admin } from "@/types";
import { UserIcon } from "@heroicons/react/24/outline";
import AdminDetail from "./adminDatail/AdminDetail";
import AdminTableHeader from "./adminDatail/AdminTableHeader";

const AdminTable = () => {
	const admins = useAdminStore((state) => state.admins);

	const data = admins?.data || [];
	const message = admins?.message || "No message available";

	return (
		<div className="p-4 bg-white shadow">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
					<UserIcon className="w-6 h-6 mr-3 text-blue-600" />
					Admin Management
				</h2>
				{message && (
					<div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-md">
						<p className="text-blue-700 text-sm font-medium">{message}</p>
					</div>
				)}
			</div>
			<div className="border-1 border-gray-200">
				<table className="min-w-full divide-y divide-gray-300">
					<AdminTableHeader />
					<tbody className="bg-white divide-y divide-gray-100 cursor-pointer">
						{data.map((admin: Admin, index: number) => (
							<AdminDetail key={admin.id} admin={admin} index={index} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AdminTable;
