import React from "react";

// Define the data structure for each row
interface TableData {
  id: number;
  user: string;
  admin: string;
  brand: string;
  category: string;
  product: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockData: TableData[] = [
  {
    id: 1,
    user: "John Doe",
    admin: "Admin One",
    brand: "Nike",
    category: "Shoes",
    product: "Air Max 2023",
    createdAt: new Date(2023, 0, 1).toISOString(), // January 1, 2023
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    user: "Jane Smith",
    admin: "Admin Two",
    brand: "Adidas",
    category: "Clothing",
    product: "Ultra Boost",
    createdAt: new Date(2023, 1, 15).toISOString(), // February 15, 2023
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    user: "Mike Johnson",
    admin: "Admin One",
    brand: "Puma",
    category: "Accessories",
    product: "Sports Bag Pro",
    createdAt: new Date(2023, 2, 28).toISOString(), // March 28, 2023
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    user: "Mike Johnson",
    admin: "Admin One",
    brand: "Puma",
    category: "Accessories",
    product: "Sports Bag Pro",
    createdAt: new Date(2023, 2, 28).toISOString(), // March 28, 2023
    updatedAt: new Date().toISOString(),
  },
];

// Define the structure of each column
type Column = {
  key: keyof TableData;
  header: string;
  render?: (value: TableData[keyof TableData]) => React.ReactNode;
};

// Define the table columns
const columns: Column[] = [
  { key: "id", header: "ID" },
  { key: "user", header: "User" },
  { key: "admin", header: "Admin" },
  { key: "brand", header: "Brand" },
  { key: "category", header: "Category" },
  { key: "product", header: "Product" },
  {
    key: "createdAt",
    header: "Created At",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    key: "updatedAt",
    header: "Updated At",
    render: (value) => new Date(value).toLocaleDateString(),
  },
];

// The mock table component
const MockTable = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th key={column.key} className="border p-2 text-left" scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                No data available
              </td>
            </tr>
          ) : (
            mockData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={`${row.id}-${column.key}`} className="border p-2">
                    {column.render
                      ? column.render(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MockTable;
