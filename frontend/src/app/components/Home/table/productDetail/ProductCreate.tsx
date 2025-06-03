import { useState, FC, FormEvent } from "react";
import { useBrandStore, useCategoryStore, useProductStore } from "@/store";
import { Product } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const productForm = {
	name: "",
	price: 0,
	serial: "",
	description: "",
	sold: 0,
	quantity: 0,
	brandId: 0,
	categoryId: 0,
};

const ProductCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState(productForm);
	const [message, setMessage] = useState<string>("");
	const createProduct = useProductStore((state) => state.createProduct);
	const brands = useBrandStore((state) => state.brands.data);
	const categories = useCategoryStore((state) => state.categories.data);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!formData.name) {
			setMessage("กรุณากรอกชื่อสินค้า");
			return;
		}

		if (!formData.price || formData.price <= 0) {
			setMessage("กรุณากรอกราคาที่ถูกต้อง");
			return;
		}

		try {
			await createProduct(formData as Product);
			showSuccessToast("สร้างสินค้าสำเร็จ");
			setIsOpen(false);
			setFormData(productForm);
		} catch {
			showErrorToast("ไม่สามารถสร้างสินค้าได้");
		}
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium border border-blue-200 hover:border-blue-300 cursor-pointer">
				<PlusIcon className="w-4 h-4" />
				สร้างสินค้า
			</button>

			<div
				className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-10 ${
					isOpen ? "visible" : "invisible"
				} transition-all duration-300`}>
				<div
					className={`bg-white p-6 rounded-lg shadow-lg w-auto transition-transform duration-300 transform ${
						isOpen ? "scale-100" : "scale-95"
					}`}>
					<div className="space-y-6">
						<h2 className="text-2xl font-semibold text-gray-900">สร้างสินค้า</h2>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										ชื่อสินค้า
									</label>
									<input
										type="text"
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder="กรอกชื่อสินค้า"
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										ราคา
									</label>
									<input
										type="number"
										value={formData.price}
										onChange={(e) =>
											setFormData({
												...formData,
												price: parseFloat(e.target.value) || 0,
											})
										}
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder="กรอกราคา"
										min="0"
										step="0.01"
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										หมายเลขสินค้า
									</label>
									<input
										type="text"
										value={formData.serial}
										onChange={(e) =>
											setFormData({ ...formData, serial: e.target.value })
										}
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder="กรอกหมายเลขสินค้า"
										min="0"
										step="0.01"
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										จำนวนสินค้า
									</label>
									<input
										type="number"
										value={formData.quantity}
										onChange={(e) =>
											setFormData({
												...formData,
												quantity: parseInt(e.target.value),
											})
										}
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
										placeholder="กรอกจำนวนสินค้า"
										min="0"
										step="0.01"
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										แบรนด์
									</label>
									<select
										value={formData.brandId}
										onChange={(e) =>
											setFormData({
												...formData,
												brandId: parseInt(e.target.value) || 0,
											})
										}
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors">
										<option value={0}>เลือกแบรนด์</option>
										{brands?.map((brand) => (
											<option key={brand.id} value={brand.id}>
												{brand.name}
											</option>
										))}
									</select>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										หมวดหมู่
									</label>
									<select
										value={formData.categoryId}
										onChange={(e) =>
											setFormData({
												...formData,
												categoryId: parseInt(e.target.value) || 0,
											})
										}
										className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors">
										<option value={0}>เลือกหมวดหมู่</option>
										{categories?.map((category) => (
											<option key={category.id} value={category.id}>
												{category.name}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium text-gray-700">
									รายละเอียดสินค้า
								</label>
								<input
									type="text"
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="กรอกรายละเอียดสินค้าา"
									min="0"
									step="0.01"
								/>
							</div>

							{message && <div className="text-red-600 text-sm mt-2">{message}</div>}

							<div className="flex gap-3 pt-4">
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium cursor-pointer">
									ยกเลิก
								</button>
								<button
									type="submit"
									className="flex-1 px-4 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors font-medium cursor-pointer">
									สร้าง
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductCreate;
