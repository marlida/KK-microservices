"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const HeroBanner = () => {
	return (
		<div className="bg-white text-gray-800 p-16 pt-32 text-center min-h-screen flex flex-col items-center justify-center">
			<h1 className="text-5xl font-extrabold">Welcome to KK Service</h1>
			<p className="text-xl mt-4">Your trusted partner for all services</p>
			<button
				onClick={() => (window.location.href = "#overview")}
				className="mt-6 px-6 py-4 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 flex items-center gap-3 w-auto cursor-pointer">
				<ArrowRightIcon className="w-5 h-5" />
				<span className="whitespace-nowrap">Get Started</span>
			</button>
		</div>
	);
};

export default HeroBanner;
