// utils/export/orders.export.ts
import ExcelJS from "exceljs";
import { Response } from "express";
import prisma from "../../config/db";

interface OrderExportData {
	id: number;
	user: string;
	admin: string;
	product: string;
	status: string;
	deposit: number;
	total: number;
	createdAt: string;
	updatedAt: string;
}

export const exportOrders = async (res: Response): Promise<void> => {
	try {
		const data = await prisma.order.findMany({
			include: {
				user: { select: { name: true } },
				admin: { select: { name: true } },
				product: { select: { name: true } },
			},
		});

		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Orders");

		// Define columns with proper formatting
		worksheet.columns = [
			{ header: "ID", key: "id", width: 10 },
			{ header: "ชื่อผู้ใช้", key: "user", width: 20 },
			{ header: "แอดมิน", key: "admin", width: 20 },
			{ header: "สินค้า", key: "product", width: 30 },
			{ header: "สถานะ", key: "status", width: 15 },
			{ header: "มัดจำ", key: "deposit", width: 15 },
			{ header: "ยอดรวม", key: "total", width: 15 },
			{ header: "วันที่สร้าง", key: "createdAt", width: 35 },
			{ header: "วันที่่อัพเดท", key: "updatedAt", width: 35 },
		];

		// Style header row
		worksheet.getRow(1).font = { bold: true };
		worksheet.getRow(1).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFE0E0E0" },
		};

		// Add data rows
		const exportData: OrderExportData[] = data.map((order) => ({
			id: order.id,
			user: order.user?.name || "-",
			admin: order.admin?.name || "-",
			product: order.product?.name || "-",
			status: order.status || "-",
			deposit: order.deposit || 0,
			total: order.total || 0,
			createdAt: order.createdAt.toISOString(),
			updatedAt: order.updatedAt.toISOString(),
		}));

		exportData.forEach((row) => worksheet.addRow(row));

		// Set response headers
		const filename = `orders_${new Date().toISOString().split("T")[0]}.xlsx`;
		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		);
		res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

		// Write to response
		await workbook.xlsx.write(res);
		res.end();
	} catch (error) {
		console.error("Error exporting orders:", error);
		res.status(500).json({ error: "Failed to export orders" });
	}
};
