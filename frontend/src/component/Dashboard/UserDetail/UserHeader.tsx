interface UserHeaderProps {
	onAddUser: () => void;
}

export default function UserHeader({ onAddUser }: UserHeaderProps) {
	return (
		<div className="px-6 py-4 border-b border-gray-200">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<svg
						className="w-5 h-5 text-gray-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
					<h2 className="text-lg font-medium text-gray-900">จัดการข้อมูลผู้ใช้</h2>
				</div>
				<button
					onClick={onAddUser}
					className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-sm font-medium transition-colors cursor-pointer flex items-center gap-2">
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4v16m8-8H4"
						/>
					</svg>
					เพิ่มผู้ใช้
				</button>
			</div>
		</div>
	);
}
