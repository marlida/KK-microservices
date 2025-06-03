import { useEffect, useState } from "react";
import { useAdminStore } from "@/store";
import { Admin } from "@/types";
import { UserIcon } from "@heroicons/react/24/outline";
import AdminDetail from "./adminDetail/AdminDetail";
import AdminTableHeader from "./adminDetail/AdminTableHeader";
import { showSuccessToast } from "@/lib/toast";
import RefreshButton from "../../RefreshButton";
import AdminCreate from "./adminDetail/AdminCreate";
import { InputFilter, DropdownFilter } from "../InputFilter";
import { formatDate } from "@/lib/dateUtils";

const AdminTable = () => {
	const [filter, setFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");

	const admins = useAdminStore((state) => state.admins);
	const fetchAdmins = useAdminStore((state) => state.fetchAdmins);

	const uniqueDates = Array.from(
		new Set(admins?.data?.map((admin) => formatDate(admin.createdAt))),
	);

	const data =
		admins?.data?.filter(
			(admin) =>
				admin.name?.toLowerCase().includes(filter.toLowerCase()) &&
				(!dateFilter || formatDate(admin.createdAt) === dateFilter),
		) || [];

	const message = admins?.message;

	useEffect(() => {
		if (message) {
			showSuccessToast(message);
		}
	}, [message]);

	return (
		<div className="p-4 bg-white shadow">
			<div className="mb-6 flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-700 mb-3 flex items-center">
					<UserIcon className="w-6 h-6 mr-3 text-blue-600" />
					จัดการผู้ดูแลระบบ
				</h2>
				<div className="flex items-center gap-4">
					<AdminCreate />
					<RefreshButton onRefresh={fetchAdmins} />
				</div>
			</div>
			{/* Filter Input */}
			<div className="flex justify-between">
				<InputFilter value={filter} onChange={setFilter} placeholder="Filter by name" />
				<DropdownFilter options={uniqueDates} value={dateFilter} onChange={setDateFilter} />
			</div>
			{/* Admin Table */}
			<div className="border-1 border-gray-200">
				<table className="w-full divide-y divide-gray-300 ">
					<AdminTableHeader />
					<tbody className="bg-white divide-y divide-gray-100 cursor-pointer">
						{data.map((admin: Admin, index: number) => (
							<AdminDetail key={admin.id} admin={admin} index={index} />
						))}
					</tbody>
				</table>
			</div>
			{data.length === 0 && (
				<div className="text-center text-gray-500 py-4">
					<p>ไม่พบผู้ดูแลระบบ</p>
				</div>
			)}
		</div>
	);
};

export default AdminTable;
