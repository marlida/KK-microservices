import { useState, FC, FormEvent } from "react";
import { useBrandStore, useCategoryStore } from "@/store";
import { Category } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

type CategoryCreateData = Pick<Category, "name"> & { brandId?: number };

const CategoryCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState<CategoryCreateData>({ name: "", brandId: undefined });
	const [message, setMessage] = useState("");
	const createCategory = useCategoryStore((state) => state.createCategory);
	const brands = useBrandStore((state) => state.brands.data);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!formData.name?.trim()) {
			setMessage("กรุณากรอกชื่อหมวดหมู่");
			return;
		}
		if (!formData.brandId) {
			setMessage("กรุณาเลือกแบรนด์");
			return;
		}

		try {
			await createCategory({
				name: formData.name,
				brandId: formData.brandId!,
			});
			showSuccessToast("สร้างหมวดหมู่สำเร็จ");
			setIsOpen(false);
			setFormData({ name: "", brandId: undefined });
		} catch {
			showErrorToast("ไม่สามารถสร้างหมวดหมู่ได้");
		}
	};

	return (
		<>
			<button
				onClick={() => {
					setIsOpen(true);
				}}
				className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium border border-blue-200 hover:border-blue-300 cursor-pointer">
				<PlusIcon className="w-4 h-4" />
				สร้างหมวดหมู่
			</button>

			<div
				className={`fixed inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 z-10 ${
					isOpen
						? "visible opacity-100 pointer-events-auto"
						: "invisible opacity-0 pointer-events-none"
				}`}>
				<div
					className={`bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-300 ${
						isOpen ? "scale-100" : "scale-95"
					}`}>
					<h2 className="text-2xl font-semibold text-gray-900 mb-6">สร้างหมวดหมู่</h2>

					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">ชื่อ</label>
							<input
								type="text"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								placeholder="กรอกชื่อหมวดหมู่"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">แบรนด์</label>
							<select
								value={formData.brandId || ""}
								onChange={(e) =>
									setFormData({
										...formData,
										brandId: e.target.value
											? parseInt(e.target.value)
											: undefined,
									})
								}
								className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
								<option value="" disabled>
									เลือกแบรนด์
								</option>
								{brands.map((brand) => (
									<option key={brand.id} value={brand.id}>
										{brand.name}
									</option>
								))}
							</select>
						</div>

						{message && <div className="text-red-600 text-sm">{message}</div>}

						<div className="flex gap-3 pt-4">
							<button
								type="button"
								onClick={() => {
									setIsOpen(false);
								}}
								className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium">
								ยกเลิก
							</button>
							<button
								type="submit"
								className="flex-1 px-4 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors font-medium">
								สร้าง
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CategoryCreate;
