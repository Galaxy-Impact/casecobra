"use client";
import React, { FC, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  toast,
} from "@casecobra/ui";
import { OrderStatus } from "@/types";
import { updateOrderStatus } from "@/services/order";

const LABEL_MAP: Record<OrderStatus, string> = {
  fulfilled: "Fulfilled",
  shipped: "Shipped",
  awaiting_shipment: "Awaiting Shipment",
};

const allOrderStatus = Object.keys(LABEL_MAP);

interface StatusDropdownProps {
  id: string;
  orderStatus: OrderStatus;
}

const StatusDropdown: FC<StatusDropdownProps> = ({ id, orderStatus }) => {
  const [status, setStatus] = useState<OrderStatus>(orderStatus);

  const onClick = async (newStatus: OrderStatus) => {
    let previousStatus = status;
    setStatus(newStatus);

    const res = await updateOrderStatus({ id, status: newStatus });
    if (res.status === "error") {
      toast.error(res.message);
      setStatus(previousStatus);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-52 flex justify-between items-center text-gray-700"
        >
          {LABEL_MAP[status]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {allOrderStatus.map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100",
              {
                "bg-zinc-100": orderStatus === status,
              }
            )}
            onClick={() => onClick(status as OrderStatus)}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4 text-primary",
                orderStatus === status ? "opacity-100" : "opacity-0"
              )}
            />
            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
