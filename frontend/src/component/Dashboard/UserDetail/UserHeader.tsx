interface UserHeaderProps {
	onAddUser: () => void;
}

export default function UserHeader({ onAddUser }: UserHeaderProps) {
	return (
		<div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
			<h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
				จัดการข้อมูลผู้ใช้
			</h2>
			<div className="mt-2 flex gap-2">
				<button
					onClick={onAddUser}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors cursor-pointer">
					เพิ่มผู้ใช้
				</button>
			</div>
		</div>
	);
}
