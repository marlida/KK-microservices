import React from "react";
import { formatDate } from "@/lib/dateUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const OrderTable = () => {
  // Placeholder data - replace with actual data fetching and state management
  const orders = [
    { id: "1", customer: "John Doe", date: new Date(), total: 99.99, status: "Pending" },
    { id: "2", customer: "Jane Smith", date: new Date(), total: 149.5, status: "Shipped" },
  ];

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Order Table</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r">Order ID</TableHead>
              <TableHead className="border-r">Customer</TableHead>
              <TableHead className="border-r">Date</TableHead>
              <TableHead className="border-r">Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="border-r">{order.id}</TableCell>
                <TableCell className="border-r">{order.customer}</TableCell>
                <TableCell className="border-r">{formatDate(order.date.toISOString())}</TableCell>
                <TableCell className="border-r">${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.length === 0 && <p className="text-center py-4">No orders to display.</p>}
      </CardContent>
    </Card>
  );
};

export default OrderTable;
