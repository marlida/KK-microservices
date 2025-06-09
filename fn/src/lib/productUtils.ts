// filepath: c/Users/Beam/Documents/GitHub/KK-microservices/frontend/src/lib/productUtils.ts
import { Product } from '@/types';
import * as z from 'zod';
import { Brand, Category } from '@/types'; // Import Brand and Category types

// Schema for product creation form, can be used by other components if needed
export const productFormSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อสินค้า" }),
  price: z.coerce.number().min(0, { message: "กรุณากรอกราคา" }),
  description: z.string().optional().nullable(),
  serial: z.string().optional().nullable(),
  quantity: z.coerce.number().min(0, { message: "กรุณากรอกจำนวน" }),
  sold: z.coerce.number().min(0).optional().nullable(),
  brandId: z.coerce.number().min(1, { message: "กรุณาเลือกยี่ห้อ" }),
  categoryId: z.coerce.number().min(1, { message: "กรุณาเลือกหมวดหมู่" }),
});

// Type inferred from the schema, can be used for form values
export type ProductFormValues = z.infer<typeof productFormSchema>;

// Type for the payload when creating a product, omitting auto-generated fields
export type ProductCreationPayload = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Transforms form data into the shape expected by the API for product creation.
 * Handles potential null values from the form and ensures they are undefined if necessary.
 * @param data The product form values.
 * @returns The product data payload for API submission.
 */
export const transformProductFormData = (data: ProductFormValues): ProductCreationPayload => {
  return {
    name: data.name,
    price: data.price,
    description: data.description ?? undefined,
    serial: data.serial ?? undefined,
    quantity: data.quantity,
    sold: data.sold ?? undefined,
    brandId: data.brandId,
    categoryId: data.categoryId,
    // Add other transformations or default values if needed, e.g., for 'image'
  };
};

// Add any other product-specific utility functions here, for example:
// - Formatting product data for display
// - Validation functions (though Zod handles much of this)
// - Functions to interact with product-related aspects of the store or API if they become complex

// Interfaces for form row configurations
export interface BaseFieldConfig {
	name: keyof ProductFormValues;
	label: string;
	placeholder: string;
}

export interface InputFieldConfig extends BaseFieldConfig {
	isInput: true;
	inputType?: "text" | "number";
}

export interface SelectFieldConfig extends BaseFieldConfig {
	isInput: false;
	optionsSource: Array<{ id: number | string; name: string }>;
}

export type FieldConfig = InputFieldConfig | SelectFieldConfig;

export interface RowConfig {
	fields: FieldConfig[];
	className?: string;
}

// Function to generate form row configurations
export const getFormRowConfigs = (
	brandsData: Brand[] | undefined,
	categoriesData: Category[] | undefined,
): RowConfig[] => [
	{
		className: "flex gap-4 w-full",
		fields: [
			{
				name: "name",
				label: "ชื่อสินค้า",
				placeholder: "ชื่อสินค้า",
				isInput: true,
				inputType: "text",
			},
			{
				name: "price",
				label: "ราคา",
				placeholder: "ราคา",
				isInput: true,
				inputType: "number",
			},
		],
	},
	{
		className: "flex gap-4",
		fields: [
			{
				name: "description",
				label: "รายละเอียด",
				placeholder: "รายละเอียดสินค้า",
				isInput: true,
				inputType: "text",
			},
			{
				name: "serial",
				label: "Serial Number",
				placeholder: "Serial Number",
				isInput: true,
				inputType: "text",
			},
		],
	},
	{
		className: "flex gap-4",
		fields: [
			{
				name: "quantity",
				label: "จำนวน",
				placeholder: "จำนวน",
				isInput: true,
				inputType: "number",
			},
			{
				name: "sold",
				label: "จำนวนที่ขายแล้ว (ถ้ามี)",
				placeholder: "จำนวนที่ขายแล้ว",
				isInput: true,
				inputType: "number",
			},
		],
	},
	{
		className: "flex gap-4 w-full",
		fields: [
			{
				name: "brandId",
				label: "ยี่ห้อ",
				placeholder: "เลือกยี่ห้อ",
				isInput: false,
				optionsSource: (brandsData || [])
					.map((b) => ({ ...b, name: b.name || "" }))
					.filter((b) => b.name !== ""),
			},
			{
				name: "categoryId",
				label: "หมวดหมู่",
				placeholder: "เลือกหมวดหมู่",
				isInput: false,
				optionsSource: (categoriesData || [])
					.map((c) => ({ ...c, name: c.name || "" }))
					.filter((c) => c.name !== ""),
			},
		],
	},
];

