import { User } from "@/types/types";

interface SearchTermProps {
	searchTerm: string;
	filteredUsers: User[];
	currentPage: number;
	totalPages: number;
	setSearchTerm: (term: string) => void;
}

export default function SearchTerm({ searchTerm, filteredUsers, currentPage, totalPages, setSearchTerm }: SearchTermProps) {
	return (
		<div>
			{searchTerm && (
				<div className="px-6 py-3 bg-blue-50 border-b border-blue-200">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<svg
								className="w-4 h-4 text-blue-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>{" "}
							<span className="text-sm text-blue-700">
								ผลการค้นหา &quot;{searchTerm}&quot;: พบ {filteredUsers.length}{" "}
								รายการ (แสดงหน้า {currentPage} จาก {totalPages} หน้า)
							</span>
						</div>
						<button
							onClick={() => setSearchTerm("")}
							className="text-blue-500 hover:text-blue-700 text-sm font-medium">
							ล้างการค้นหา
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
