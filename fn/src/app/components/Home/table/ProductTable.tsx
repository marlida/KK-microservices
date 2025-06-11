import { useState, useMemo } from "react";
import { useProductStore, useBrandStore, useCategoryStore } from "@/store";
import { Product } from "@/types";
import { CubeIcon } from "@heroicons/react/24/outline";
import ProductDetail from "./productDetail/ProductDetail";
import RefreshButton from "../../RefreshButton";
import ProductCreate from "./productDetail/ProductCreate";
import { InputFilter } from "../InputFilter";
import { formatDate } from "@/lib/dateUtils";
import ProductExport from "./productDetail/ProductExport";
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

const ProductTable = () => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>("");

	const productsData = useProductStore((state) => state.products);
	const fetchProducts = useProductStore((state) => state.fetchProducts);
	const brandsData = useBrandStore((state) => state.brands);
	const categoriesData = useCategoryStore((state) => state.categories);

	const data = useMemo(() => productsData?.data || [], [productsData]);

	const brandsMap = useMemo(() => {
		const map = new Map<number, string>();
		brandsData?.data?.forEach((brand) => {
			if (brand.id && brand.name) {
				map.set(brand.id, brand.name);
			}
		});
		return map;
	}, [brandsData]);

	const categoriesMap = useMemo(() => {
		const map = new Map<number, string>();
		categoriesData?.data?.forEach((category) => {
			if (category.id && category.name) {
				map.set(category.id, category.name);
			}
		});
		return map;
	}, [categoriesData]);

	const columns: ColumnDef<Product>[] = useMemo(
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
						ชื่อสินค้า
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (info) => info.getValue() as string,
			},
			{
				accessorKey: "price",
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="flex items-center justify-center w-full h-auto">
						ราคา
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (info) => info.getValue() as number,
			},
			{
				accessorKey: "serial",
				header: "ซีเรียล",
				cell: (info) => (info.getValue() as string) || "-",
			},
			{
				accessorKey: "description",
				header: "รายละเอียด",
				cell: (info) => (info.getValue() as string) || "-",
			},
			{
				accessorKey: "quantity",
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="flex items-center justify-center w-full h-auto">
						จำนวน
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (info) => info.getValue() as number,
			},
			{
				accessorKey: "sold",
				header: ({ column }) => (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="flex items-center justify-center w-full h-auto">
						ขายแล้ว
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				),
				cell: (info) => (info.getValue() as number) ?? 0,
			},
			{
				accessorKey: "brandId",
				header: "แบรนด์",
				cell: (info) => brandsMap.get(info.getValue() as number) || "-",
			},
			{
				accessorKey: "categoryId",
				header: "หมวดหมู่",
				cell: (info) => categoriesMap.get(info.getValue() as number) || "-",
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
				cell: ({ row }) => <ProductDetail product={row.original} />,
			},
		],
		[brandsMap, categoriesMap],
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
						<CubeIcon className="w-6 h-6 mr-3 text-blue-600" />
						จัดการสินค้า
					</CardTitle>
					<div className="flex items-center gap-4">
						<ProductExport />
						<ProductCreate />
						<RefreshButton onRefresh={fetchProducts} />
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between mb-4">
					<InputFilter
						value={globalFilter ?? ""}
						onChange={(value) => setGlobalFilter(String(value))}
						placeholder="ค้นหาสินค้า..."
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
										ไม่พบสินค้า
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

export default ProductTable;
