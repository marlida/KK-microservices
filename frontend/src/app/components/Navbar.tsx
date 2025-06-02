"use client";

import Link from "next/link";
import {
	CheckCircleIcon,
	HomeIcon,
	BuildingOfficeIcon,
	ChartBarIcon,
} from "@heroicons/react/24/outline";
import RefreshButton from "./RefreshButton";

const Navbar = () => {
	return (
		<nav className="bg-white border-b border-gray-100 shadow-sm fixed top-0 left-0 right-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center space-x-2">
						<CheckCircleIcon className="w-6 h-6 text-blue-600" />
						<div className="text-xl font-semibold text-gray-900">KK Service</div>
					</div>
					<ul className="flex space-x-8">
						<li>
							<Link href="/">
								<span className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
									<HomeIcon className="w-4 h-4" />
									<span>Home</span>
								</span>
							</Link>
						</li>
						<li>
							<Link href="/contact">
								<span className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
									<BuildingOfficeIcon className="w-4 h-4" />
									<span>Services & Contact</span>
								</span>
							</Link>
						</li>
						<li>
							<Link href="/summary">
								<span className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
									<ChartBarIcon className="w-4 h-4" />
									<span>Summary</span>
								</span>
							</Link>
						</li>
						<RefreshButton onRefresh={() => window.location.reload()} />
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
