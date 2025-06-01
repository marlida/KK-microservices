import { Brand } from "@/types/types";

interface BrandProps {
	activeTab: string;
	brands: Brand[];
}

export default function BrandComponent({ activeTab, brands }: BrandProps) {
	return (
		<div>
			{activeTab === "brands" && (
				<div className="bg-white rounded-lg shadow overflow-hidden">
					<div className="px-6 py-4 border-b">
						<h2 className="text-xl font-semibold">Brands</h2>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										ID
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Created
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{brands.map((brand) => (
									<tr key={brand.id}>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{brand.id}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{brand.name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{new Date(brand.createdAt).toLocaleDateString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}
