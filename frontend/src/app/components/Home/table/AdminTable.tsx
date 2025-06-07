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
import { Table, TableBody, TableCaption, TableHeader } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="flex items-center">
						<UserIcon className="w-6 h-6 mr-3 text-blue-600" />
						จัดการผู้ดูแลระบบ
					</CardTitle>
					<div className="flex items-center gap-4">
						<AdminCreate />
						<RefreshButton onRefresh={fetchAdmins} />
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{/* Filter Input */}
				<div className="flex justify-between mb-4">
					<InputFilter value={filter} onChange={setFilter} placeholder="Filter by name" />
					<DropdownFilter
						options={uniqueDates}
						value={dateFilter}
						onChange={setDateFilter}
					/>
				</div>
				{/* Admin Table */}
				<div className="border rounded-md">
					<Table>
						<TableHeader>
							<AdminTableHeader />
						</TableHeader>
						<TableBody>
							{data.length > 0 &&
								data.map((admin: Admin, index: number) => (
									<AdminDetail key={admin.id} admin={admin} index={index} />
								))}
						</TableBody>
						{data.length === 0 && (
							<TableCaption className="my-5">ไม่พบผู้ดูแลระบบ</TableCaption>
						)}
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};

export default AdminTable;
