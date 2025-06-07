import { useState, FC } from "react";
import { useBrandStore } from "@/store";
import { Brand } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
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

const brandFormSchema = z.object({
	name: z.string().min(1, { message: "กรุณากรอกชื่อแบรนด์" }),
});

type BrandFormValues = z.infer<typeof brandFormSchema>;

const BrandCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const createBrand = useBrandStore((state) => state.createBrand);

	const form = useForm<BrandFormValues>({
		resolver: zodResolver(brandFormSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (data: BrandFormValues) => {
		try {
			await createBrand({ name: data.name } as Brand);
			showSuccessToast("สร้างแบรนด์สำเร็จ");
			setIsOpen(false);
			form.reset();
		} catch (error) {
			showErrorToast("ไม่สามารถสร้างแบรนด์ได้");
			console.error("Failed to create brand:", error);
		}
	};

	return (
		<>
			<Button
				variant="outline"
				onClick={() => {
					setIsOpen(true);
					form.reset();
				}}>
				<PlusIcon className="w-4 h-4" />
				สร้างแบรนด์
			</Button>

			{isOpen && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 z-50">
					<Card className="w-full max-w-md mx-auto">
						<CardHeader>
							<CardTitle>สร้างแบรนด์</CardTitle>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

									<CardFooter className="flex gap-3 pt-4 w-full">
										<Button
											type="button"
											variant="outline"
											className="flex-1"
											onClick={() => {
												setIsOpen(false);
												form.reset();
											}}>
											ยกเลิก
										</Button>
										<Button
											type="submit"
											className="flex-1"
											disabled={form.formState.isSubmitting}>
											{form.formState.isSubmitting
												? "กำลังสร้าง..."
												: "สร้าง"}
										</Button>
									</CardFooter>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			)}
		</>
	);
};

export default BrandCreate;
