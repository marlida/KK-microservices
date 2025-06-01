"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Order, User, Brand, Category, Product } from "@/types/types";
import OrderComponent from "@/component/Dashboard/OrderComponent";
import UserComponent from "@/component/Dashboard/UserComponent";
import BrandComponent from "@/component/Dashboard/BrandComponent";
import CategoriesComponent from "@/component/Dashboard/CategoriesComponent";
import ProductCompotnent from "@/component/Dashboard/ProductCompotnent";

interface DashboardClientProps {
	orders: Order[];
	users: User[];
	brands: Brand[];
	categories: Category[];
	products: Product[];
}

export default function DashboardClient({
	orders,
	users,
	brands,
	categories,
	products,
}: DashboardClientProps) {
	const [activeTab, setActiveTab] = useState("orders");
	const router = useRouter();

	const handleRefresh = () => {
		router.refresh(); // Refresh server component data
	};

	return (
		<>
			{/* Data Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                            <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
                        </div>
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                            <p className="text-2xl font-bold text-green-600">{users.length}</p>
                        </div>
						<svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Total Brands</h3>
                            <p className="text-2xl font-bold text-purple-600">{brands.length}</p>
                        </div>
                        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Total Categories</h3>
                            <p className="text-2xl font-bold text-orange-600">{categories.length}</p>
                        </div>
                        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                            <p className="text-2xl font-bold text-red-600">{products.length}</p>
                        </div>
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                </div>
            </div>

			{/* Navigation Tabs with Refresh Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <nav className="flex flex-wrap gap-5">
                    {[
                        { id: "orders", label: "ประวัติการซ่อม" },
                        { id: "users", label: "ลูกค้า" },
                        { id: "brands", label: "แบรนด์" },
                        { id: "categories", label: "หมวดหมู่" },
                        { id: "products", label: "สินค้า" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 border rounded-sm text-sm font-medium transition-all duration-200 cursor-pointer ${
                                activeTab === tab.id
                                    ? "bg-slate-900 text-white shadow-sm"
                                    : "text-slate-600 border-slate-200"
                            }`}>
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 flex items-center gap-2 font-medium text-sm cursor-pointer">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                    <span>รีเฟรช</span>
                </button>
            </div>

			{/* Component Tables */}
			<OrderComponent activeTab={activeTab} orders={orders} />
			<UserComponent activeTab={activeTab} users={users} />
			<BrandComponent activeTab={activeTab} brands={brands} />
			<CategoriesComponent activeTab={activeTab} categories={categories} />
			<ProductCompotnent activeTab={activeTab} products={products} />
		</>
	);
}
