// utils/export/products.export.ts
import ExcelJS from "exceljs";
import { Response } from "express";
import prisma from "../../config/db";

interface ProductExportData {
	id: number;
	name: string;
	brand: string;
	category: string;
	price: number;
	quantity: number;
	sold: number;
	createdAt: string;
	updatedAt: string;
}

export const exportProducts = async (res: Response): Promise<void> => {
	try {
		const data = await prisma.product.findMany({
			include: {
				brand: { select: { name: true } },
				category: { select: { name: true } },
			},
		});

		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Products");

		// Define columns with proper formatting
		worksheet.columns = [
			{ header: "ID", key: "id", width: 10 },
			{ header: "ชื่อ", key: "name", width: 30 },
			{ header: "ยี่ห้อ", key: "brand", width: 20 },
			{ header: "หมวดหมู่", key: "category", width: 20 },
			{ header: "ราคา", key: "price", width: 10 },
			{ header: "จำนวน", key: "quantity", width: 10 },
			{ header: "ขายแล้ว", key: "sold", width: 10 },
			{ header: "วันที่สร้าง", key: "createdAt", width: 35 },
			{ header: "วันที่่อัพเดท", key: "updatedAt", width: 35 },
			{ header: "แบนด์", key: "brand", width: 15 },
		];

		// Style header row
		worksheet.getRow(1).font = { bold: true };
		worksheet.getRow(1).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFE0E0E0" },
		};

		// Add data rows
		const exportData: ProductExportData[] = data.map((product) => ({
			id: product.id,
			name: product.name || "-",
			brand: product.brand?.name || "-",
			category: product.category?.name || "-",
			price: product.price || 0,
			quantity: product.quantity || 0,
			sold: product.sold || 0,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
		}));

		exportData.forEach((row) => worksheet.addRow(row));

		// Set response headers
		const filename = `products_${new Date().toISOString().split("T")[0]}.xlsx`;
		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		);
		res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

		// Write to response
		await workbook.xlsx.write(res);
		res.end();
	} catch (error) {
		console.error("Error exporting products:", error);
		res.status(500).json({ error: "Failed to export products" });
	}
};
