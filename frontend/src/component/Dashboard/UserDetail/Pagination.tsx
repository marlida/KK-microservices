interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	filteredItems: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({
	currentPage,
	totalPages,
	totalItems,
	filteredItems,
	onPageChange,
}: PaginationProps) {
	if (filteredItems <= 10) {
		return null;
	}

	const handlePrevPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
			<div className="flex items-center text-sm text-gray-700">
				แสดง {filteredItems} จาก {totalItems} รายการ
			</div>
			<div className="flex items-center gap-2">
				<button
					onClick={handlePrevPage}
					disabled={currentPage <= 1}
					className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
					ก่อนหน้า
				</button>
				<span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
					{currentPage}
				</span>
				<button
					onClick={handleNextPage}
					disabled={currentPage >= totalPages}
					className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
					ถัดไป
				</button>
			</div>
		</div>
	);
}
