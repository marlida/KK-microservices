import { useState, FC, useEffect } from "react";
import { useBrandStore, useCategoryStore } from "@/store";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

const formSchema = z.object({
	name: z.string().min(1, { message: "กรุณากรอกชื่อหมวดหมู่" }),
	brandId: z.string().min(1, { message: "กรุณาเลือกแบรนด์" }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const createCategory = useCategoryStore((state) => state.createCategory);
	const fetchBrands = useBrandStore((state) => state.fetchBrands);
	const brands = useBrandStore((state) => state.brands.data);
	const categoryMessage = useCategoryStore((state) => state.categories.message);

	useEffect(() => {
		fetchBrands();
	}, [fetchBrands]);

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			brandId: "",
		},
	});

	const onSubmit = async (values: CategoryFormValues) => {
		try {
			await createCategory({
				name: values.name as string, // Ensure name is a string
				brandId: parseInt(values.brandId),
			});
			showSuccessToast(categoryMessage || "สร้างหมวดหมู่สำเร็จ");
			setIsOpen(false);
			form.reset();
		} catch (err) {
			console.error(err);
			showErrorToast(categoryMessage || "เกิดข้อผิดพลาดในการสร้างหมวดหมู่");
		}
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				variant="outline"
				className="flex items-center gap-2">
				<PlusIcon className="w-4 h-4" />
				สร้างหมวดหมู่
			</Button>

			{isOpen && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<Card className="w-full max-w-md py-6">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
								<CardHeader>
									<CardTitle>สร้างหมวดหมู่</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>ชื่อ</FormLabel>
												<FormControl>
													<Input
														placeholder="กรอกชื่อหมวดหมู่"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="brandId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>แบรนด์</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}>
														<SelectTrigger>
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
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter className="flex justify-end gap-2">
									<Button
										type="button"
										variant="outline"
										onClick={() => setIsOpen(false)}>
										ยกเลิก
									</Button>
									<Button type="submit">สร้าง</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</div>
			)}
		</>
	);
};

export default CategoryCreate;
