import { useState, useMemo } from "react";
import { useAdminStore } from "@/store";
import { Admin } from "@/types";
import { UserIcon } from "@heroicons/react/24/outline";
import AdminDetail from "./adminDetail/AdminDetail";
import RefreshButton from "../../RefreshButton";
import AdminCreate from "./adminDetail/AdminCreate";
import { InputFilter } from "../InputFilter";
import { formatDate } from "@/lib/dateUtils";
import { ArrowUpDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const AdminTable = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>("");

	const adminsData = useAdminStore((state) => state.admins);
	const fetchAdmins = useAdminStore((state) => state.fetchAdmins);

	const data = adminsData?.data || [];

	const columns: ColumnDef<Admin>[] = useMemo(
		() => [
			{
				accessorKey: "id",
				header: "ลำดับ",
				cell: (info) => info.row.index + 1,
			},
			{
				accessorKey: "name",
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="flex items-center justify-center w-full h-auto">
						ชื่อผู้ดูแลระบบ
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: "tel",
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="flex items-center justify-center w-full h-auto">
						เบอร์โทรศัพท์
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (info) => info.getValue() || "-",
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
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="flex items-center justify-center w-full h-auto">
						อัพเดตเมื่อ
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (info) => formatDate(info.getValue() as string),
			},
			{
				id: "actions",
				header: "จัดการ",
				cell: ({ row }) => {
					return <AdminDetail admin={row.original} />;
				},
			},
		],
		[],
	);

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
						<UserIcon className="w-6 h-6 mr-3 text-blue-600" />
						จัดการผู้ดูแลระบบ
					</CardTitle>
					<div className="flex items-center gap-4">
						<AdminCreate />
						<RefreshButton onRefresh={fetchAdmins} />
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between mb-4">
					<InputFilter
						value={globalFilter ?? ""}
						onChange={(value) => setGlobalFilter(String(value))}
						placeholder="ค้นหาผู้ดูแลระบบ..."
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
											<TableCell key={cell.id}>
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
										ไม่พบผู้ดูแลระบบ
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

export default AdminTable;
