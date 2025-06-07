import { useState, FC, FormEvent } from "react";
import { useBrandStore, useCategoryStore } from "@/store";
import { Category } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
			setMessage(""); // Clear message on success
		} catch {
			showErrorToast("ไม่สามารถสร้างหมวดหมู่ได้");
		}
	};

	return (
		<>
			<Button
				variant="outline"
				onClick={() => {
					setIsOpen(true);
				}}>
				<PlusIcon className="w-4 h-4" />
				สร้างหมวดหมู่
			</Button>

			{isOpen && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 z-50">
					<Card className="w-full max-w-md mx-auto">
						<CardHeader>
							<CardTitle>สร้างหมวดหมู่</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-5">
								<div className="space-y-2">
									<Label htmlFor="categoryName">ชื่อ</Label>
									<Input
										id="categoryName"
										type="text"
										value={formData.name}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										placeholder="กรอกชื่อหมวดหมู่"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="brandSelect">แบรนด์</Label>
									<Select
										value={formData.brandId?.toString() || ""}
										onValueChange={(value) =>
											setFormData({
												...formData,
												brandId: value ? parseInt(value) : undefined,
											})
										}>
										<SelectTrigger id="brandSelect" className="w-full">
											<SelectValue placeholder="เลือกแบรนด์" />
										</SelectTrigger>
										<SelectContent>
											{brands.map((brand) => (
												<SelectItem
													key={brand.id}
													value={brand.id.toString()}>
													{brand.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{message && <div className="text-red-600 text-sm">{message}</div>}
								<CardFooter className="flex gap-3 pt-4 w-full">
									<Button
										type="button"
										variant="outline"
										className="flex-1"
										onClick={() => {
											setIsOpen(false);
											setMessage("");
										}}>
										ยกเลิก
									</Button>
									<Button type="submit" className="flex-1">
										สร้าง
									</Button>
								</CardFooter>
							</form>
						</CardContent>
					</Card>
				</div>
			)}
		</>
	);
};

export default CategoryCreate;
