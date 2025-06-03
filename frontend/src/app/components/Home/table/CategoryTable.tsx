import React from "react";
import CategoryCreate from "./categoryDetail/CategoryCreate";

const CategoryTable = () => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Category Table</h2>
      <p>Display category data here.</p>
      <CategoryCreate />
    </div>
  );
};

export default CategoryTable;
