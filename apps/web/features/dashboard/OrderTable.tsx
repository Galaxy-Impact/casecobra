import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@casecobra/ui";
import StatusDropdown from "./StatusDropdown";
import { formatPrice } from "@/utils/helper";
import { getRecentOrders } from "@/services/order";
import Error from "@/components/Error";

const OrderTable = async () => {
  const response = await getRecentOrders();

  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-bold tracking-tight mb-6">
        Incoming orders
      </h1>

      {response.status === "error" ? (
        <Error />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {response.data.orders.map((order) => (
                <TableRow key={order.id} className="bg-accent">
                  <TableCell>
                    <p className="font-medium xl:text-lg">
                      {order.shippingAddress?.name}
                    </p>
                    <span className="hidden text-sm text-muted-foreground md:inline">
                      {order.user.email}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {response.data.orders.length === 0 ? (
            <div className="mt-12 text-center">
              <p className="text-lg">No orders</p>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default OrderTable;
