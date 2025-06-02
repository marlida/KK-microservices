import React from "react";

interface NavButtonProps {
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium border border-gray-200 hover:border-gray-300 cursor-pointer"
    >
      {label}
    </button>
  );
};

export default NavButton;
