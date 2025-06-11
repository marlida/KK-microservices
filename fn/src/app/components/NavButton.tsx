import { Button } from "@/components/ui/button";
import { FC } from "react";

interface NavButtonProps {
	label: string;
	onClick: () => void;
}

const NavButton: FC<NavButtonProps> = ({ label, onClick }) => {
	return (
		<Button onClick={onClick} variant="outline" className="text-gray-600 hover:text-gray-900">
			{label}
		</Button>
	);
};

export default NavButton;
