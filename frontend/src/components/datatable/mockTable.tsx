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

const mockData: TableData[] = [
  {
    id: 1,
    user: "John Doe",
    admin: "Admin One",
    brand: "Nike",
    category: "Shoes",
    product: "Air Max 2023",
    createdAt: "2023-01-10T09:15:00.000Z",
    updatedAt: "2023-01-15T14:30:00.000Z",
  },
  {
    id: 2,
    user: "Jane Smith",
    admin: "Admin Two",
    brand: "Adidas",
    category: "Clothing",
    product: "Ultra Boost",
    createdAt: "2023-02-05T11:20:00.000Z",
    updatedAt: "2023-02-10T16:45:00.000Z",
  },
  {
    id: 3,
    user: "Mike Johnson",
    admin: "Admin One",
    brand: "Puma",
    category: "Accessories",
    product: "Sports Bag Pro",
    createdAt: "2023-03-12T08:00:00.000Z",
    updatedAt: "2023-03-18T13:10:00.000Z",
  },
  {
    id: 4,
    user: "Mike Johnson",
    admin: "Admin One",
    brand: "Puma",
    category: "Accessories",
    product: "Sports Bag Pro",
    createdAt: "2023-04-01T10:30:00.000Z",
    updatedAt: "2023-04-05T15:25:00.000Z",
  },
];

// structure of each column in the table

type Column = {
  key: keyof TableData;
  header: string;
  render?: (value: any) => React.ReactNode;
};

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

const MockTable = () => {
  return (
    <div className="table-container">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th key={column.key} className="border p-2">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={`${row.id}-${column.key}`} className="border p-2">
                  {column.render
                    ? column.render(row[column.key])
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MockTable;