import { useState, FC } from "react";
import { useUserStore } from "@/store";
import { User } from "@/types";
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
	name: z.string().min(1, { message: "กรุณากรอกชื่อผู้ใช้" }),
	tel: z
		.string()
		.min(10, { message: "กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง 10 หลัก" })
		.max(10, { message: "กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง 10 หลัก" })
		.regex(/^\d{10}$/, { message: "กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง 10 หลัก" }),
});

type UserFormValues = z.infer<typeof formSchema>;

const UserCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const createUser = useUserStore((state) => state.createUser);
	const message = useUserStore((state) => state.users.message);

	const form = useForm<UserFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			tel: "",
		},
	});

	const onSubmit = async (values: UserFormValues) => {
		try {
			await createUser(values as User);
			showSuccessToast(message || "สร้างผู้ใช้สำเร็จ");
			setIsOpen(false);
			form.reset();
		} catch (err) {
			console.error(err);
			showErrorToast(message || "ไม่สามารถสร้างผู้ใช้ได้");
		}
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				variant="outline"
				className="flex items-center gap-2">
				<PlusIcon className="w-4 h-4" />
				สร้างผู้ใช้
			</Button>

			{isOpen && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<Card className="w-full max-w-md">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<CardHeader>
									<CardTitle>สร้างผู้ใช้</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>ชื่อ</FormLabel>
												<FormControl>
													<Input placeholder="กรอกชื่อผู้ใช้" {...field} />
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
												<FormLabel>หมายเลขโทรศัพท์</FormLabel>
												<FormControl>
													<Input placeholder="กรอกหมายเลขโทรศัพท์" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter className="flex justify-end gap-2">
									<Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
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

export default UserCreate;
