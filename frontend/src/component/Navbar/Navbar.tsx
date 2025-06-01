"use client";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();

	const navItems = [
		{ href: "/", label: "Home" },
		{ href: "/services", label: "Services & Contact" },
		{ href: "/dashboard", label: "Dashboard" },
		{ href: "/sumary", label: "Sumary" },
	];

	return (
		<nav className="bg-gradient-to-r from-slate-50 to-blue-50 shadow-xs border-b border-blue-100">
			<div className="text-zinc-800">
				<div className="container mx-auto max-w-7xl flex justify-between items-center px-6">
					<div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
						KK Service
					</div>
					<ul className="flex space-x-8 font-semibold text-sm">
						{navItems.map((item) => (
							<li
								key={item.href}
								className={`${
									pathname === item.href
										? "border-b-3 border-blue-600 text-blue-700 bg-blue-50 rounded-t-lg"
										: "text-zinc-700 hover:text-blue-600"
								} hover:bg-blue-50 transition-all duration-300 py-5 px-3 rounded-t-lg cursor-pointer`}>
								<a href={item.href} className="flex items-center gap-2">
									{item.href === "/" && (
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
										</svg>
									)}
									{/* {item.href === "/services" && (
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
											<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
										</svg>
									)}
									{item.href === "/dashboard" && (
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
											<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
										</svg>
									)}
									{item.href === "/sumary" && (
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
											<path
												fillRule="evenodd"
												d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
												clipRule="evenodd"
											/>
										</svg>
									)} */}
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}
