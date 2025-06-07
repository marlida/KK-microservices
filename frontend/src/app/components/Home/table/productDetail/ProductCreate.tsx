import { useState, FC, useMemo, JSX } from "react";
import { useBrandStore, useCategoryStore, useProductStore } from "@/store";
import {
	productFormSchema,
	ProductFormValues,
	transformProductFormData,
	getFormRowConfigs,
	InputFieldConfig,
	SelectFieldConfig,
} from "@/lib/productUtils";
import { PlusIcon } from "@heroicons/react/24/outline";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";

const ProductCreate: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { createProduct } = useProductStore();
	const { brands } = useBrandStore();
	const { categories } = useCategoryStore();

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			price: 0,
			description: null,
			serial: null,
			quantity: 0,
			sold: null,
			brandId: 0,
			categoryId: 0,
		},
	});

	const onSubmit = async (data: ProductFormValues) => {
		try {
			const productData = transformProductFormData(data);
			await createProduct(productData);
			showSuccessToast("สร้างสินค้าสำเร็จ");
			setIsOpen(false);
			form.reset();
		} catch (error) {
			showErrorToast("เกิดข้อผิดพลาดในการสร้างสินค้า");
			console.error("Failed to create product:", error);
		}
	};

	const formRowConfigs = useMemo(
		() => getFormRowConfigs(brands.data, categories.data),
		[brands.data, categories.data],
	);

	return (
		<div>
			<Button variant={"outline"} onClick={() => setIsOpen(true)}>
				<PlusIcon className="mr-2 h-5 w-5" />
				เพิ่มสินค้า
			</Button>
			{isOpen && (
				<div className="fixed inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 z-50">
					<Card className="mb-4 w-full max-w-2xl mx-auto">
						<CardHeader>
							<CardTitle>เพิ่มสินค้าใหม่</CardTitle>
							<CardDescription>กรอกรายละเอียดสินค้าด้านล่าง</CardDescription>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-6 w-full">
									{formRowConfigs.map((rowConfig, rowIndex) => (
										<div key={rowIndex} className={rowConfig.className}>
											{rowConfig.fields.map((config) => (
												<FormField
													key={config.name}
													control={form.control}
													name={config.name}
													render={({
														field,
													}: {
														field: ControllerRenderProps<
															ProductFormValues,
															keyof ProductFormValues
														>;
													}) => {
														let controlElement: JSX.Element;

														if (config.isInput) {
															const inputConfig =
																config as InputFieldConfig;
															switch (inputConfig.name) {
																case "price":
																	controlElement = (
																		<Input
																			type="number"
																			placeholder={
																				inputConfig.placeholder
																			}
																			{...field}
																			value={field.value ?? 0}
																			onChange={(e) =>
																				field.onChange(
																					parseFloat(
																						e.target
																							.value,
																					) || 0,
																				)
																			}
																		/>
																	);
																	break;
																case "quantity":
																	controlElement = (
																		<Input
																			type="number"
																			placeholder={
																				inputConfig.placeholder
																			}
																			{...field}
																			value={field.value ?? 0}
																			onChange={(e) =>
																				field.onChange(
																					parseInt(
																						e.target
																							.value,
																						10,
																					) || 0,
																				)
																			}
																		/>
																	);
																	break;
																case "sold":
																	controlElement = (
																		<Input
																			type="number"
																			placeholder={
																				inputConfig.placeholder
																			}
																			{...field}
																			value={
																				field.value ?? ""
																			}
																			onChange={(e) =>
																				field.onChange(
																					e.target
																						.value ===
																						""
																						? null
																						: parseInt(
																								e
																									.target
																									.value,
																								10,
																						  ),
																				)
																			}
																		/>
																	);
																	break;
																case "description":
																case "serial":
																	controlElement = (
																		<Input
																			type={
																				inputConfig.inputType ||
																				"text"
																			}
																			placeholder={
																				inputConfig.placeholder
																			}
																			{...field}
																			value={
																				field.value ?? ""
																			}
																		/>
																	);
																	break;
																default: // name and any other standard inputs
																	controlElement = (
																		<Input
																			type={
																				inputConfig.inputType ||
																				"text"
																			}
																			placeholder={
																				inputConfig.placeholder
																			}
																			{...field}
																			value={
																				field.value ?? ""
																			}
																		/>
																	);
																	break;
															}
														} else {
															const selectConfig =
																config as SelectFieldConfig;
															controlElement = (
																<Select
																	onValueChange={(value) =>
																		field.onChange(
																			Number(value),
																		)
																	}
																	value={
																		field.value?.toString() ??
																		""
																	}>
																	<FormControl>
																		<SelectTrigger className="w-full">
																			<SelectValue
																				placeholder={
																					selectConfig.placeholder
																				}
																			/>
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent className="w-full">
																		{selectConfig.optionsSource.map(
																			(option: {
																				id: number | string;
																				name: string;
																			}) => (
																				<SelectItem
																					key={option.id}
																					value={option.id.toString()}
																					className="w-full">
																					{option.name}
																				</SelectItem>
																			),
																		)}
																	</SelectContent>
																</Select>
															);
														}

														return (
															<FormItem className="w-full">
																<FormLabel>
																	{config.label}
																</FormLabel>
																<FormControl>
																	{controlElement}
																</FormControl>
																<FormMessage />
															</FormItem>
														);
													}}
												/>
											))}
										</div>
									))}
									<CardFooter className="flex justify-end space-x-2">
										<Button
											type="button"
											variant="outline"
											onClick={() => setIsOpen(false)}>
											ยกเลิก
										</Button>
										<Button type="submit">บันทึก</Button>
									</CardFooter>
								</form>
							</Form>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
};

export default ProductCreate;
