"use client";

import { FC, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface RefreshButtonProps {
	onRefresh: () => void;
}

const RefreshButton: FC<RefreshButtonProps> = ({ onRefresh }) => {
	const [loading, setLoading] = useState(false);

	const handleRefresh = async () => {
		setLoading(true);
		await onRefresh();
		setLoading(false);
	};

	return (
		<button
			onClick={handleRefresh}
			disabled={loading}
			className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium border cursor-pointer ${
				loading
					? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
					: "text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-blue-200 hover:border-blue-300"
			}`}>
			<ArrowPathIcon className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
			{loading ? "Refreshing" : "Refresh"}
		</button>
	);
};

export default RefreshButton;
