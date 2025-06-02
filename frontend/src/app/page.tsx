"use client";
import { useEffect } from "react";
import HeroBanner from "./components/Home/HeroBanner";
import DataOverview from "./components/Home/DataOverview";
import useAdminStore from "@/store/adminStore";
// import useBrandStore from "@/store/brandStore";
// import useCategoryStore from "@/store/categoryStore";
// import useOrderStore from "@/store/orderStore";
// import useProductStore from "@/store/productStore";
// import useUserStore from "@/store/userStore";

export default function Home() {
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
		<div className="relative w-full h-auto">
			<section
				id="hero"
				className={`transition-all duration-500 transform`}>
				<HeroBanner />
			</section>
			<section
				id="overview"
				className={`relative w-full h-auto transition-opacity duration-500`}>
				<DataOverview/>
			</section>
		</div>
	);
}
