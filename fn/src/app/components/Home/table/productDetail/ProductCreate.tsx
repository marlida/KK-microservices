import { useState, FC, useEffect } from "react";
import { useBrandStore, useCategoryStore, useProductStore } from "@/store";
import { Product } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
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
	name: z.string().min(1, { message: "กรุณากรอกชื่อสินค้า" }),
	price: z.coerce.number().min(0, { message: "ราคาสินค้าต้องไม่ต่ำกว่า 0" }),
	description: z.string().nullable(),
	serial: z.string().nullable(),
	quantity: z.coerce.number().min(0, { message: "จำนวนสินค้าต้องไม่ต่ำกว่า 0" }),
	sold: z.coerce.number().min(0, { message: "จำนวนที่ขายต้องไม่ต่ำกว่า 0" }).nullable(),
	brandId: z.coerce.number().min(1, { message: "กรุณาเลือกแบรนด์" }),
	categoryId: z.coerce.number().min(1, { message: "กรุณาเลือกหมวดหมู่" }),
});

type ProductFormValues = z.infer<typeof formSchema>;

const ProductCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const createProduct = useProductStore((state) => state.createProduct);
	const productMessage = useProductStore((state) => state.products.message);
	const brands = useBrandStore((state) => state.brands.data);
	const categories = useCategoryStore((state) => state.categories.data);
	const fetchBrands = useBrandStore((state) => state.fetchBrands);
	const fetchCategories = useCategoryStore((state) => state.fetchCategories);

	useEffect(() => {
		if (isOpen) {
			fetchBrands();
			fetchCategories();
		}
	}, [isOpen, fetchBrands, fetchCategories]);

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			price: 0,
			description: "",
			serial: "",
			quantity: 0,
			sold: 0,
			brandId: undefined,
			categoryId: undefined,
		},
	});

	const onSubmit = async (values: ProductFormValues) => {
		try {
			const productData: Omit<Product, "id" | "createdAt" | "updatedAt"> = {
				name: values.name,
				price: values.price,
				description: values.description ?? undefined,
				serial: values.serial ?? undefined,
				quantity: values.quantity,
				sold: values.sold ?? 0,
				brandId: values.brandId,
				categoryId: values.categoryId,
			};
			await createProduct(productData as Product);
			showSuccessToast(productMessage || "สร้างสินค้าสำเร็จ");
			setIsOpen(false);
			form.reset();
		} catch (err) {
			console.error(err);
			showErrorToast(productMessage || "เกิดข้อผิดพลาดในการสร้างสินค้า");
		}
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				variant="outline"
				className="flex items-center gap-2">
				<PlusIcon className="w-4 h-4" />
				สร้างสินค้า
			</Button>

			{isOpen && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
					<Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto py-8">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
								<CardHeader>
									<CardTitle>สร้างสินค้าใหม่</CardTitle>
									<CardDescription>กรอกรายละเอียดสินค้าด้านล่าง</CardDescription>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>ชื่อสินค้า</FormLabel>
													<FormControl>
														<Input
															placeholder="กรอกชื่อสินค้า"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="price"
											render={({ field }) => (
												<FormItem>
													<FormLabel>ราคา</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="กรอกราคา"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="quantity"
											render={({ field }) => (
												<FormItem>
													<FormLabel>จำนวน</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="กรอกจำนวนสินค้า"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="sold"
											render={({ field }) => (
												<FormItem>
													<FormLabel>จำนวนที่ขายแล้ว (ถ้ามี)</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="กรอกจำนวนที่ขายแล้ว"
															{...field}
															value={field.value ?? ""}
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
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value?.toString()}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="เลือกแบรนด์" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{brands?.map((brand) => (
																<SelectItem
																	key={brand.id}
																	value={brand.id.toString()}>
																	{brand.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="categoryId"
											render={({ field }) => (
												<FormItem>
													<FormLabel>หมวดหมู่</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value?.toString()}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="เลือกหมวดหมู่" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{categories?.map((category) => (
																<SelectItem
																	key={category.id}
																	value={category.id.toString()}>
																	{category.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<FormField
										control={form.control}
										name="serial"
										render={({ field }) => (
											<FormItem>
												<FormLabel>ซีเรียล (ถ้ามี)</FormLabel>
												<FormControl>
													<Input
														placeholder="กรอกซีเรียลนัมเบอร์"
														{...field}
														value={field.value ?? ""}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>รายละเอียด (ถ้ามี)</FormLabel>
												<FormControl>
													<Input
														placeholder="กรอกรายละเอียดสินค้า"
														{...field}
														value={field.value ?? ""}
													/>
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
										onClick={() => {
											setIsOpen(false);
											form.reset();
										}}>
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

export default ProductCreate;
