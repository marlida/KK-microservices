import { useState, useMemo } from "react";
import { useBrandStore } from "@/store";
import { Brand } from "@/types";
import { TagIcon } from "@heroicons/react/24/outline";
import BrandDetail from "./brandDetail/BrandDetail";
import RefreshButton from "../../RefreshButton";
import BrandCreate from "./brandDetail/BrandCreate";
import { formatDate } from "@/lib/dateUtils";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
	SortingState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BrandTable = () => {
	const brandsData = useBrandStore((state) => state.brands);
	const fetchBrands = useBrandStore((state) => state.fetchBrands);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");

	const data = useMemo(() => brandsData?.data || [], [brandsData]);

	const columns: ColumnDef<Brand>[] = useMemo(
		() => [
			{
				accessorKey: "id",
				header: "ลำดับ",
				cell: (info) => info.row.index + 1,
				enableSorting: false,
			},
			{
				accessorKey: "name",
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="flex items-center justify-center w-full h-auto">
						ชื่อแบรนด์
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: ({ row }) => <div className="text-left">{row.getValue("name") || "-"}</div>,
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
				cell: ({ row }) => (
					<div className="text-left">{formatDate(row.getValue("createdAt"))}</div>
				),
			},
			{
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="flex items-center justify-center w-full h-auto">
						อัปเดตเมื่อ
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: ({ row }) => (
					<div className="text-left">{formatDate(row.getValue("updatedAt"))}</div>
				),
			},
			{
				id: "actions",
				header: () => <div className="text-center">การกระทำ</div>,
				cell: ({ row }) => <BrandDetail brand={row.original} />,
			},
		],
		[],
	);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			globalFilter,
		},
		onSortingChange: setSorting,
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
						<TagIcon className="w-6 h-6 mr-3 text-blue-600" />
						จัดการแบรนด์
					</CardTitle>
					<div className="flex items-center gap-4">
						<BrandCreate />
						<RefreshButton onRefresh={fetchBrands} />
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between mb-4">
					<Input
						placeholder="ค้นหาชื่อแบรนด์..."
						value={globalFilter ?? ""}
						onChange={(event) => setGlobalFilter(event.target.value)}
						className="max-w-sm"
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
												className="text-left border-r py-2 px-8">
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
										ไม่พบข้อมูลแบรนด์
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

export default BrandTable;
