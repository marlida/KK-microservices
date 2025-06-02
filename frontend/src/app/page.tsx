"use client";
import { useEffect, useState } from "react";
import HeroBanner from "./components/Home/HeroBanner";
import DataOverview from "./components/Home/DataOverview";
import useAdminStore from "@/store/adminStore";
// import useBrandStore from "@/store/brandStore";
// import useCategoryStore from "@/store/categoryStore";
// import useOrderStore from "@/store/orderStore";
// import useProductStore from "@/store/productStore";
// import useUserStore from "@/store/userStore";

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const fetchAllData = async () => {
		await Promise.all([
			useAdminStore.getState().fetchAdmins(),
			// useBrandStore.getState().fetchBrands(),
			// useCategoryStore.getState().fetchCategories(),
			// useOrderStore.getState().fetchOrders(),
			// useProductStore.getState().fetchProducts(),
			// useUserStore.getState().fetchUsers(),
		]);
	};
	useEffect(() => {
		fetchAllData();
	}, []);

	return (
		<div className="relative">
			<div
				className={`transition-opacity duration-500 ${
					isOpen ? "opacity-0" : "opacity-100"
				}`}>
				<HeroBanner setIsOpen={setIsOpen} />
			</div>
			<div
				className={`fixed inset-0 flex items-center justify-center z-40 transition-opacity duration-500 w-screen mt-20 ${
					isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}>
				<DataOverview isOpen={isOpen} />
			</div>
		</div>
	);
}
