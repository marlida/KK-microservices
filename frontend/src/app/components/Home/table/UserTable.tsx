import { useEffect, useState } from "react";
import { useUserStore } from "@/store";
import { User } from "@/types";
import { UserIcon } from "@heroicons/react/24/outline";
import UserDetail from "./userDetail/UserDetail";
import UserTableHeader from "./userDetail/UserTableHeader";
import { showSuccessToast } from "@/lib/toast";
import RefreshButton from "../../RefreshButton";
import UserCreate from "./userDetail/UserCreate";
import { InputFilter, DropdownFilter } from "../InputFilter";
import { formatDate } from "@/lib/dateUtils";
import { Table, TableBody, TableCaption, TableHeader } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserTable = () => {
	const [filter, setFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");

	const users = useUserStore((state) => state.users);
	const fetchUsers = useUserStore((state) => state.fetchUsers);

	const uniqueDates = Array.from(new Set(users?.data?.map((user) => formatDate(user.createdAt))));

	const data =
		users?.data?.filter(
			(user) =>
				user.name?.toLowerCase().includes(filter.toLowerCase()) &&
				(!dateFilter || formatDate(user.createdAt) === dateFilter),
		) || [];

	const message = users?.message;

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
						จัดการผู้ใช้
					</CardTitle>
					<div className="flex items-center gap-4">
						<UserCreate />
						<RefreshButton onRefresh={fetchUsers} />
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between mb-4">
					<InputFilter value={filter} onChange={setFilter} placeholder="Filter by name" />
					<DropdownFilter
						options={uniqueDates}
						value={dateFilter}
						onChange={setDateFilter}
					/>
				</div>
				<div className="border rounded-md">
					<Table>
						<TableHeader>
							<UserTableHeader />
						</TableHeader>
						<TableBody>
							{data.length > 0 &&
								data.map((user: User, index: number) => (
									<UserDetail key={user.id} user={user} index={index} />
								))}
						</TableBody>
						{data.length === 0 && (
							<TableCaption className="my-5">ไม่พบผู้ใช้</TableCaption>
						)}
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};

export default UserTable;
