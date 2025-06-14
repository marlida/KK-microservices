import React, { useState, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    createColumnHelper,
    flexRender,
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    PaginationState,
} from "@tanstack/react-table";

import { AdminServices } from "@/services/adminServices";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Admin } from "@/types/admin";

import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Disc3 } from "lucide-react";
import { AdminEdit } from "./AdminEdit";

const columnHelper = createColumnHelper<Admin>();

const columns: ColumnDef<Admin, any>[] = [
    columnHelper.accessor("id", {
        header: "ID",
        cell: info => info.getValue(),
    }),
    columnHelper.accessor("name", {
        header: "ชื่อผู้ดูแลระบบ",
        cell: info => info.getValue(),
    }),
    columnHelper.accessor("tel", {
        header: "เบอร์โทรศัพท์",
        cell: info => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
        header: "วันที่สร้าง",
        cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("updatedAt", {
        header: "วันที่อัปเดต",
        cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.display({
        id: "actions",
        header: "การจัดการ",
        cell: ({ row }) => (
            <div className="flex justify-center space-x-2">
                <AdminEdit admin={row.original} />
                <Button variant={"outline"} onClick={() => console.log("Delete", row.original.id)}>
                    <Trash2 strokeWidth={1.2} color={"red"} />
                </Button>
            </div>
        ),
    }),
];

function AdminTable() {
    // State to manage the data, loading state, sorting, and filtering
    const [data, setData] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    // Pagination state
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    // Initialize the table with the data and columns
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            pagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await AdminServices.fetchAdminData();
            setData(data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="my-10 flex justify-center p-4">
                <Disc3 className="animate-spin" size={40} strokeWidth={1} color={"purple"} />
            </div>
        );
    }

    return (
        <div className="mt-7 w-auto">
            {/* Search */}
            <div className="mb-4">
                <Input
                    value={globalFilter ?? ""}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder="ค้นหาผู้ดูแลระบบ..."
                    className="w-full max-w-sm"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    {/* Table header */}
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            // render each header group
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    // render each header cell
                                    <th
                                        key={header.id}
                                        className="cursor-pointer border-r-1 bg-purple-900 px-6 py-4 text-xs font-medium tracking-wider text-white uppercase dark:bg-zinc-900"
                                        onClick={header.column.getToggleSortingHandler()}>
                                        <div className="flex items-center justify-center space-x-1">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: " 🔼",
                                                desc: " 🔽",
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    {/* Table body */}
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-zinc-600 dark:bg-zinc-800">
                        {table.getRowModel().rows.map(row => (
                            // render each row
                            <tr key={row.id} className="hover:bg-gray-50 hover:dark:bg-zinc-700">
                                {row.getVisibleCells().map(cell => (
                                    // render each cell
                                    <td
                                        key={cell.id}
                                        className="border-r border-gray-200 px-6 py-2 text-center text-sm whitespace-nowrap text-gray-900 dark:border-gray-600 dark:text-white">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-white">
                        แสดง{" "}
                        {table.getState().pagination.pageIndex *
                            table.getState().pagination.pageSize +
                            1}{" "}
                        ถึง{" "}
                        {Math.min(
                            (table.getState().pagination.pageIndex + 1) *
                                table.getState().pagination.pageSize,
                            table.getFilteredRowModel().rows.length
                        )}{" "}
                        จากทั้งหมด {table.getFilteredRowModel().rows.length} รายการ
                    </span>
                </div>

                {/* Pagination controls */}
                <div className="flex items-center justify-center space-x-2">
                    <Button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        variant={"outline"}
                        size={"icon"}>
                        {"<<"}
                    </Button>
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        variant={"outline"}
                        size={"icon"}>
                        {"<"}
                    </Button>
                    <span className="rounded-md border px-4 py-2.5 text-center text-xs text-gray-700 dark:text-white">
                        {table.getState().pagination.pageIndex + 1}
                        {" of "}
                        {table.getPageCount()}
                    </span>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        variant={"outline"}
                        size={"icon"}>
                        {">"}
                    </Button>
                    <Button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        variant={"outline"}
                        size={"icon"}>
                        {">>"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AdminTable;
