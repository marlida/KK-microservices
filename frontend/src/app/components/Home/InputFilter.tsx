import { FC } from "react";
import {
	MagnifyingGlassIcon,
	CalendarDaysIcon,
	ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface InputFilterProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

const InputFilter: FC<InputFilterProps> = ({ value, onChange, placeholder }) => {
	return (
		<div className="relative mb-4 w-1/2">
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder || "Filter..."}
				className="w-full px-4 py-3 pl-10 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white"
			/>
			<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
		</div>
	);
};

interface DropdownFilterProps {
	options: string[];
	value: string;
	onChange: (value: string) => void;
}

const DropdownFilter: FC<DropdownFilterProps> = ({ options, value, onChange }) => {
	return (
		<div className="relative mb-4 w-1/6">
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full px-4 py-3 pl-10 pr-10 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out hover:bg-white appearance-none cursor-pointer shadow-sm hover:shadow-md transform hover:scale-[1.02] focus:scale-[1.02]">
				<option value="" className="text-gray-500">
					Select a date
				</option>
				{options.map((option, index) => (
					<option
						key={index}
						value={option}
						className="text-gray-700 bg-white hover:bg-blue-50 py-2">
						{option}
					</option>
				))}
			</select>
			<div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
				<ChevronDownIcon className="w-4 h-4 text-gray-400" />
			</div>
			<CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
		</div>
	);
};

export { InputFilter, DropdownFilter };
