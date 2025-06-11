/* eslint-disable */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useState, FC, useEffect } from "react";
import { useAdminStore, useProductStore, useOrderStore, useUserStore } from "@/store";
import { Order, OrderCreationPayload } from "@/types";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

const formSchema = z.object({
	name: z.string().min(1, "ต้องระบุชื่อคำสั่งซื้อ"),
	adminId: z.number({
		required_error: "ต้องเลือกผู้ดูแลระบบ",
		invalid_type_error: "ID ผู้ดูแลระบบต้องเป็นตัวเลข",
	}),
	productId: z.number({
		required_error: "ต้องเลือกสินค้า",
		invalid_type_error: "ID สินค้าต้องเป็นตัวเลข",
	}),
	status: z.string().nullable(),
	customer_issue: z.string().nullable(),
	technician_issue: z.string().nullable(),
	deposit: z.number().nullable(),
	total: z.number().nullable(),
	quantity: z.number({
		required_error: "ต้องระบุจำนวน",
		invalid_type_error: "จำนวนต้องเป็นตัวเลข",
	}).min(1, "จำนวนต้องมีอย่างน้อย 1"),
	userId: z.number({
		required_error: "ต้องระบุ ID ผู้ใช้",
		invalid_type_error: "ID ผู้ใช้ต้องเป็นตัวเลข",
	}).min(1, "ID ผู้ใช้ไม่ถูกต้อง"),
});

type OrderFormValues = z.infer<typeof formSchema>;

const OrderCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const createOrder = useOrderStore((state) => state.createOrder);
	const admins = useAdminStore((state) => state.admins.data);
	const products = useProductStore((state) => state.products.data);
	const fetchAdmins = useAdminStore((state) => state.fetchAdmins);
	const fetchProducts = useProductStore((state) => state.fetchProducts);
	const currentUser = useUserStore((state) => state.currentUser);
	const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);

	useEffect(() => {
		if (isOpen) {
			fetchAdmins();
			fetchProducts();
			if (!currentUser && fetchCurrentUser) {
				fetchCurrentUser();
			}
		}
	}, [isOpen, fetchAdmins, fetchProducts, fetchCurrentUser, currentUser]);

	const form = useForm<OrderFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			adminId: undefined, 
			productId: undefined, 
			status: "กำลังรอดำเนินการ",
			customer_issue: "",
			technician_issue: "",
			deposit: 0,
			total: 0,
			quantity: 1, 
			userId: undefined, 
		},
	});

	useEffect(() => { 
		if (isOpen && currentUser) {
			form.setValue("userId", currentUser.id, { shouldValidate: true });
		} else if (isOpen && !currentUser) {
			form.setValue("userId", undefined as any, { shouldValidate: true }); 
		}
	}, [isOpen, currentUser, form]);

	const onSubmit = async (values: OrderFormValues) => {
		try {
			const orderData: OrderCreationPayload = {
				name: values.name,
				adminId: values.adminId,
				productId: values.productId,
				quantity: values.quantity,
				status: values.status,
				customer_issue: values.customer_issue ?? undefined,
				technician_issue: values.technician_issue ?? undefined,
				deposit: values.deposit ?? 0,
				total: values.total ?? 0,
				userId: values.userId,
			};
			await createOrder(orderData);
			setIsOpen(false);
			showSuccessToast("สร้างคำสั่งซื้อสำเร็จ!");
			form.reset(); 
		} catch (error: any) {
			console.error("ไม่สามารถสร้างคำสั่งซื้อได้:", error);
			showErrorToast(error.message || "ไม่สามารถสร้างคำสั่งซื้อได้ โปรดลองอีกครั้ง");
		}
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				variant="outline"
				className="bg-green-500 text-white hover:bg-green-600"
			>
				สร้างคำสั่งซื้อ
			</Button>

			{isOpen && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
					<Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto py-8">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
								<CardHeader>
									<CardTitle>สร้างคำสั่งซื้อใหม่</CardTitle>
									<CardDescription>
										กรอกรายละเอียดเพื่อสร้างคำสั่งซื้อใหม่
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4 px-6">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>ชื่อคำสั่งซื้อ</FormLabel>
												<FormControl>
													<Input placeholder="กรอกชื่อคำสั่งซื้อ" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="adminId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>ผู้ดูแลระบบ</FormLabel>
												<FormControl>
													<Select
														onValueChange={(value) => 
															field.onChange(value ? Number(value) : undefined)
														}
														value={field.value !== undefined ? String(field.value) : ""} 
													>
														<SelectTrigger>
															<SelectValue placeholder="เลือกผู้ดูแลระบบ" />
														</SelectTrigger>
														<SelectContent>
															{admins.map((admin) => (
																<SelectItem
																	key={admin.id}
																	value={String(admin.id)}>
																	{admin.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="productId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>สินค้า</FormLabel>
												<Select
													onValueChange={(value) => 
														field.onChange(value ? Number(value) : undefined)
													}
													value={field.value !== undefined ? String(field.value) : ""} 
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="เลือกสินค้า" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{products?.map((product) => (
															<SelectItem
																key={product.id}
																value={product.id.toString()}>
																{product.name}
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
										name="quantity"
										render={({ field }) => (
											<FormItem>
												<FormLabel>จำนวน</FormLabel>
												<FormControl>
													<Input
														type="number"
														placeholder="กรอกจำนวนสินค้า"
														{...field}
														onChange={(e) => {
															const value = parseInt(e.target.value, 10);
															field.onChange(isNaN(value) ? undefined : value);
														}}
														value={field.value ?? ""} 
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="status"
										render={({ field }) => (
											<FormItem>
												<FormLabel>สถานะ</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value ?? undefined}
													value={field.value ?? undefined}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="เลือกสถานะ" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="กำลังรอดำเนินการ">กำลังรอดดำเนินการ</SelectItem>
														<SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
														<SelectItem value="ดำเนินการเสร็จสิ้น">ดำเนินการเสร็จสิ้น</SelectItem>
														<SelectItem value="ยกเลิก">ยกเลิก</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="customer_issue"
										render={({ field }) => (
											<FormItem>
												<FormLabel>ปัญหาจากลูกค้า</FormLabel>
												<FormControl>
													<Input placeholder="กรอกปัญหาจากลูกค้า" {...field} value={field.value ?? ""} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="technician_issue"
										render={({ field }) => (
											<FormItem>
												<FormLabel>ปัญหาจากช่าง</FormLabel>
												<FormControl>
													<Input placeholder="กรอกปัญหาจากช่าง" {...field} value={field.value ?? ""} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="deposit"
										render={({ field }) => (
											<FormItem>
												<FormLabel>มัดจำ</FormLabel>
												<FormControl>
													<Input 
														type="number" 
														placeholder="กรอกจำนวนเงินมัดจำ" 
														{...field} 
														onChange={e => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
														value={field.value ?? ""}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="total"
										render={({ field }) => (
											<FormItem>
												<FormLabel>ราคารวม</FormLabel>
												<FormControl>
													<Input 
														type="number" 
														placeholder="กรอกราคารวม" 
														{...field} 
														onChange={e => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
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
										}}
									>
										ยกเลิก
									</Button>
									<Button type="submit" disabled={form.formState.isSubmitting}>
										{form.formState.isSubmitting ? "กำลังสร้าง..." : "สร้างคำสั่งซื้อ"}
									</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</div>
			)}
		</>
	);
};

export default OrderCreate;
