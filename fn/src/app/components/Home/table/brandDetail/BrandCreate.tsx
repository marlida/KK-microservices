import { useState, FC } from "react";
import { useBrandStore } from "@/store";
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
	name: z.string().min(1, { message: "กรุณากรอกชื่อแบรนด์" }),
});

type BrandFormValues = z.infer<typeof formSchema>;

const BrandCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const createBrand = useBrandStore((state) => state.createBrand);
	const message = useBrandStore((state) => state.brands.message);

	const form = useForm<BrandFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (values: BrandFormValues) => {
		try {
			await createBrand({
				id: 0,
				name: values.name,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
			showSuccessToast(message || "สร้างแบรนด์สำเร็จ");
			setIsOpen(false);
			form.reset();
		} catch (err) {
			console.error(err);
			showErrorToast(message || "เกิดข้อผิดพลาดในการสร้างแบรนด์");
		}
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				variant="outline"
				className="flex items-center gap-2">
				<PlusIcon className="w-4 h-4" />
				สร้างแบรนด์
			</Button>

			{isOpen && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
					<Card className="w-full max-w-md py-6">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
								<CardHeader>
									<CardTitle>สร้างแบรนด์</CardTitle>
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
														placeholder="กรอกชื่อแบรนด์"
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
										onClick={() => {
											setIsOpen(false);
											form.reset(); // Reset form on cancel
										}}>
										ยกเลิก
									</Button>
									<Button type="submit" disabled={form.formState.isSubmitting}>
										{form.formState.isSubmitting ? "กำลังสร้าง..." : "สร้าง"}
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

export default BrandCreate;
