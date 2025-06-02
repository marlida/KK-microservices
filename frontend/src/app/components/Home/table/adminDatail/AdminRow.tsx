import React from "react";

interface AdminRowProps {
  children: React.ReactNode;
  isEven: boolean;
}

const AdminRow: React.FC<AdminRowProps> = ({ children, isEven }) => {
  return (
    <tr
      className={`transition-colors duration-200 hover:bg-gray-50 ${
        isEven ? "bg-white" : "bg-gray-50"
      }`}
    >
      {children}
    </tr>
  );
};

export default AdminRow;
