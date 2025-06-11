"use client";

import { FC, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface RefreshButtonProps {
	onRefresh: () => Promise<void> | void;
	className?: string;
}

const RefreshButton: FC<RefreshButtonProps> = ({ onRefresh, className }) => {
	const [loading, setLoading] = useState(false);

	const handleRefresh = async () => {
		setLoading(true);
		try {
			await onRefresh();
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			variant="outline"
			onClick={handleRefresh}
			disabled={loading}
			className={`${className} transition-all duration-200 hover:bg-gray-50 active:scale-90 active:bg-gray-100`}>
			<ArrowPathIcon
				className={`h-4 w-4 ${loading && "animate-spin"} transition-transform duration-200`}
			/>
			{loading ? "Refreshing..." : "Refresh"}
		</Button>
	);
};

export default RefreshButton;
