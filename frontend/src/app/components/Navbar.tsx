import Link from "next/link";
import {
	CheckCircleIcon,
	HomeIcon,
	BuildingOfficeIcon,
	ChartBarIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
	return (
		<nav className="bg-white/80 backdrop-blur-md border-b border-gray-100/50 fixed top-0 left-0 right-0 z-50">
			<div className="px-20 mx-auto lg:px-8">
				<div className="flex justify-between items-center h-14">
					<div className="flex items-center space-x-2">
						<CheckCircleIcon className="w-5 h-5 text-blue-500" />
						<div className="text-lg font-medium text-gray-800 tracking-tight">
							KK Service
						</div>
					</div>
					<ul className="flex space-x-6">
						<li>
							<Link href="/">
								<span className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-800 transition-colors duration-300 text-sm font-medium py-2 px-3 rounded-full hover:bg-gray-50">
									<HomeIcon className="w-4 h-4" />
									<span>Home</span>
								</span>
							</Link>
						</li>
						<li>
							<Link href="/contact">
								<span className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-800 transition-colors duration-300 text-sm font-medium py-2 px-3 rounded-full hover:bg-gray-50">
									<BuildingOfficeIcon className="w-4 h-4" />
									<span>Services</span>
								</span>
							</Link>
						</li>
						<li>
							<Link href="/summary">
								<span className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-800 transition-colors duration-300 text-sm font-medium py-2 px-3 rounded-full hover:bg-gray-50">
									<ChartBarIcon className="w-4 h-4" />
									<span>Summary</span>
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
