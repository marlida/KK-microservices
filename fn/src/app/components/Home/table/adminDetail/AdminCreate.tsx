import { useState, FC } from "react";
import { useAdminStore } from "@/store";
import { Admin } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
	name: z.string().min(1, { message: "กรุณากรอกชื่อผู้ดูแลระบบ" }),
	tel: z
		.string()
		.min(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง 10 หลัก" })
		.max(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง 10 หลัก" })
		.regex(/^\d{10}$/, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง 10 หลัก" }),
});

type AdminFormValues = z.infer<typeof formSchema>;

const AdminCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const createAdmin = useAdminStore((state) => state.createAdmin);
	const message = useAdminStore((state) => state.admins.message);

	const form = useForm<AdminFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			tel: "",
		},
	});

	const onSubmit = async (values: AdminFormValues) => {
		try {
			await createAdmin(values as Admin);
			showSuccessToast(message || "สร้างผู้ดูแลระบบสำเร็จ");
			setIsOpen(false);
			form.reset();
		} catch (err) {
			console.error(err);
			showErrorToast(message || "เกิดข้อผิดพลาดในการสร้างผู้ดูแลระบบ");
		}
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				variant="outline"
				className="flex items-center gap-2">
				<PlusIcon className="w-4 h-4" />
				สร้างผู้ดูแลระบบ
			</Button>

			{isOpen && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<Card className="w-full max-w-md py-6">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
								<CardHeader>
									<CardTitle>สร้างผู้ดูแลระบบ</CardTitle>
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
														placeholder="กรอกชื่อผู้ดูแลระบบ"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="tel"
										render={({ field }) => (
											<FormItem>
												<FormLabel>เบอร์โทรศัพท์</FormLabel>
												<FormControl>
													<Input
														placeholder="กรอกเบอร์โทรศัพท์"
														{...field}
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

export default AdminCreate;
