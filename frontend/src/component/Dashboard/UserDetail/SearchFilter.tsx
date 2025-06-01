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
			<div className="flex gap-3 items-center">
				<div className="relative flex-1">
					<svg
						className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="text"
						placeholder="ค้นหา..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-colors"
					/>
				</div>
				<select
					value={dateFilter}
					onChange={(e) => setDateFilter(e.target.value)}
					className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-white cursor-pointer min-w-[120px]">
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
