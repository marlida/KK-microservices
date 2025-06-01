import { Product } from "@/types/types";

interface ProductProps {
	activeTab: string;
	products: Product[];
}

export default function ProductCompotnent({ activeTab, products }: ProductProps) {
	return (
		<div>
			{activeTab === "products" && (
				<div className="bg-white rounded-lg shadow overflow-hidden">
					<div className="px-6 py-4 border-b">
						<h2 className="text-xl font-semibold">Products</h2>
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
										Serial
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Price
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Brand
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Category
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Quantity
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Sold
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{products.map((product) => (
									<tr key={product.id}>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{product.id}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{product.name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{product.serial}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											฿{product.price}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{product.brand?.name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{product.category?.name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{product.quantity}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{product.sold}
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
