import { useAdminStore, useBrandStore, useCategoryStore, useUserStore } from "@/store";
import {
	UserGroupIcon,
	UsersIcon,
	TagIcon,
	RectangleGroupIcon,
	CubeIcon,
	WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
			{/* Data counts grid */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-20">
				{counts.map((item, index) => (
					<Card
						key={index}
						className={`group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
						${activeTable === item.label ? "shadow-xl border-blue-200 bg-blue-50" : "hover:bg-gray-50"}
						`}>
						<CardContent className="p-2">
							<div className="flex items-center justify-between mb-3">
								<div className="p-2.5 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
									<item.icon className="w-5 h-5 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
								</div>
								<Badge variant="secondary" className="bg-blue-100 text-blue-700">
									Live
								</Badge>
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
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
