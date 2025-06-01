import { User } from "@/types/types";

interface SearchFilterProps {
	searchTerm: string;
	dateFilter: string;
	setSearchTerm: (term: string) => void;
	setDateFilter: (filter: string) => void;
	filteredUsers: User[];
	totalUsers: number;
}

export default function SearchFilter({
	searchTerm,
	dateFilter,
	setSearchTerm,
	setDateFilter,
	filteredUsers,
	totalUsers,
}: SearchFilterProps) {
	return (
		<div className="p-4 border-b border-gray-200">
			<div className="flex gap-4 items-center">
				<input
					type="text"
					placeholder="ค้นหาด้วยชื่อหรือเบอร์โทร..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<select
					value={dateFilter}
					onChange={(e) => setDateFilter(e.target.value)}
					className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
					<option value="">ทั้งหมด</option>
					<option value="today">วันนี้</option>
					<option value="week">สัปดาห์นี้</option>
					<option value="month">เดือนนี้</option>
				</select>
			</div>
			{(searchTerm || dateFilter) && (
				<div className="mt-3 text-sm text-gray-600">
					พบ {filteredUsers.length} รายการจากทั้งหมด {totalUsers} รายการ
					{searchTerm && (
						<span className="ml-2">
							สำหรับ &ldquo;
							<span className="font-medium">{searchTerm}</span>&rdquo;
						</span>
					)}
					{(searchTerm || dateFilter) && (
						<button
							onClick={() => {
								setSearchTerm("");
								setDateFilter("");
							}}
							className="ml-2 text-blue-600 hover:text-blue-800 underline">
							ล้างตัวกรอง
						</button>
					)}
				</div>
			)}
		</div>
	);
}
