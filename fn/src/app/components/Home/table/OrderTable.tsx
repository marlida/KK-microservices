import { useState, useMemo, useEffect } from "react";
import { useOrderStore, useAdminStore, useProductStore } from "@/store";
import { Order } from "@/types";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import OrderDetail from "./orderDetail/OrderDetail";
import RefreshButton from "../../RefreshButton";
import OrderCreate from "./orderDetail/OrderCreate";
import { InputFilter } from "../InputFilter";
import { formatDate } from "@/lib/dateUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	ColumnDef,
	flexRender,
	SortingState,
	getSortedRowModel,
	ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

const OrderTable = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>("");

	const ordersData = useOrderStore((state) => state.orders);
	const fetchOrders = useOrderStore((state) => state.fetchOrders);
	const fetchAdmins = useAdminStore((state) => state.fetchAdmins);
	const fetchProducts = useProductStore((state) => state.fetchProducts);

	useEffect(() => {
		fetchOrders();
		fetchAdmins();
		fetchProducts();
	}, [fetchOrders, fetchAdmins, fetchProducts]);

	const data = useMemo(() => ordersData?.data || [], [ordersData]);
	const columns: ColumnDef<Order>[] = [
		{
			accessorKey: "id",
			header: "ID",
			cell: (info) => info.getValue() as number,
			enableSorting: false,
		},
		{
			accessorKey: "name",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="flex items-center justify-center w-full h-auto">
					ชื่อออเดอร์
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: (info) => (info.getValue() as string) || "-",
		},
		{
			accessorKey: "admin", // Changed from adminId to admin
			header: "Admin",
			cell: ({ row }) => {
				const admin = row.original.admin;
				return admin ? admin.name : "N/A";
			},
		},
		{
			accessorKey: "product", // Changed from productId to product
			header: "Product",
			cell: ({ row }) => {
				const product = row.original.product;
				return product ? product.name : "N/A";
			},
		},
		{
			accessorKey: "status",
			header: "สถานะ",
			cell: (info) => (info.getValue() as string) || "-",
		},
		{
			accessorKey: "quantity",
			header: "Quantity", // Added quantity column
			cell: (info) => (info.getValue() as number) ?? 0,
		},
		{
			accessorKey: "customer_issue",
			header: "ปัญหาลูกค้า",
			cell: (info) => (info.getValue() as string) || "-",
		},
		{
			accessorKey: "technician_issue",
			header: "ปัญหาช่าง",
			cell: (info) => (info.getValue() as string) || "-",
		},
		{
			accessorKey: "deposit",
			header: "มัดจำ",
			cell: (info) => (info.getValue() as number) ?? 0,
		},
		{
			accessorKey: "total",
			header: "ทั้งหมด",
			cell: (info) => (info.getValue() as number) ?? 0,
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="flex items-center justify-center w-full h-auto">
					สร้างเมื่อ
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			),
			cell: (info) => formatDate(info.getValue() as string),
		},
		{
			id: "actions",
			header: "จัดการ",
			cell: ({ row }) => <OrderDetail order={row.original} />,
		},
	];

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			globalFilter,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
	});

	return (
		<Card className="pt-6">
			<CardHeader>
				<div className="flex justify-between items-center">
					<CardTitle className="flex items-center">
						<ShoppingCartIcon className="w-6 h-6 mr-3 text-blue-600" />
						จัดการออเดอร์
					</CardTitle>
					<div className="flex items-center gap-4">
						<OrderCreate />
						<RefreshButton onRefresh={fetchOrders} />
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between mb-4">
					<InputFilter
						value={globalFilter ?? ""}
						onChange={(value) => setGlobalFilter(String(value))}
						placeholder="ค้นหาออเดอร์..."
					/>
				</div>
				<div className="border rounded-md">
					<Table>
						<TableHeader className="bg-blue-900">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											className="border-r text-center text-white">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="text-left border-r py-2 px-4">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center">
										ไม่พบออเดอร์
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				{table.getPageCount() > 1 && (
					<div className="flex items-center justify-end space-x-2 py-4">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}>
							<ChevronsLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<span className="text-sm border rounded-md px-5 py-1">
							หน้า {table.getState().pagination.pageIndex + 1} จาก{" "}
							{table.getPageCount()}
						</span>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}>
							<ChevronRight className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}>
							<ChevronsRight className="h-4 w-4" />
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default OrderTable;
