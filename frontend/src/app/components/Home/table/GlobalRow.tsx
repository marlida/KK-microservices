import { ReactNode, FC } from "react";

interface GlobalRowProps {
	children: ReactNode;
	isEven: boolean;
}

const GlobalRow: FC<GlobalRowProps> = ({ children, isEven }) => {
	return (
		<tr
			className={`transition-colors duration-200 hover:bg-gray-50 ${
				isEven ? "bg-white" : "bg-gray-50"
			}`}>
			{children}
		</tr>
	);
};

export default GlobalRow;
