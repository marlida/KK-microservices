import { useAdminStore, useBrandStore, useCategoryStore, useUserStore } from "@/store";
import {
	UserGroupIcon,
	UsersIcon,
	TagIcon,
	RectangleGroupIcon,
	CubeIcon,
	WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

interface DataCounts {
	label: string;
	count: number;
	icon: React.ComponentType<{ className?: string }>;
}

export default function BannerHeader({ activeTable }: { activeTable?: string | null }) {
	const adminCount = useAdminStore((state) => state.admins.data.length);
	const userCount = useUserStore((state) => state.users.data.length);
	const brandCount = useBrandStore((state) => state.brands.data.length);
	const categoryCount = useCategoryStore((state) => state.categories.data.length);

	const counts: DataCounts[] = [
		{ label: "ผู้ดูแลระบบ", count: adminCount, icon: UserGroupIcon },
		{ label: "ผู้ใช้", count: userCount, icon: UsersIcon },
		{ label: "แบรนด์", count: brandCount, icon: TagIcon },
		{ label: "หมวดหมู่", count: categoryCount, icon: RectangleGroupIcon },
		{ label: "สินค้า", count: 0, icon: CubeIcon },
		{ label: "รายการซ่อม", count: 0, icon: WrenchScrewdriverIcon },
	];

	return (
		<div>
			<div className="relative mb-8 border-1 border-gray-200 rounded-lg shadow-sm">
				{/* Header content */}
				<div className="relative flex items-center gap-6 p-6">
					<div className="relative">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
							<CubeIcon className="w-6 h-6 text-white" />
						</div>
						<div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full"></div>
					</div>

					<div>
						<h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-purple-600 bg-clip-text text-transparent">
							KK Electronic Overview
						</h2>
						<p className="text-gray-500 text-sm mt-1">ภาพรวมข้อมูลระบบ</p>
					</div>
				</div>
			</div>

			{/* Data counts grid */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
				{counts.map((item, index) => (
					<div
						key={index}
						className={`group relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm transition-all duration-300 
						${activeTable === item.label && "shadow-2xl -translate-2 border-gray-200 bg-blue-50/80 backdrop-blur-lg"}
						`}>
						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

						{/* Content */}
						<div className="relative z-10">
							<div className="flex items-center justify-between mb-3">
								<div className="p-2.5 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
									<item.icon className="w-5 h-5 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
								</div>
								<div className="flex space-x-1">
									<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
									<div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-400"></div>
									<div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-800"></div>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-sm font-medium text-gray-600 mb-2 group-hover:text-gray-700 transition-colors">
										{item.label}
									</h3>

									<div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
										{item.count.toLocaleString()}
									</div>
								</div>

								<div className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
									<div className="flex flex-col items-end space-y-1">
										<div className="w-8 h-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full"></div>
										<div className="w-6 h-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"></div>
										<div className="w-4 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
