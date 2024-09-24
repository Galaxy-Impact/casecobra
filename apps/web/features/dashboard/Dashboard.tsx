import React from "react";

import OrderTable from "./OrderTable";
import Stats from "./Stats";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-16">
      <Stats />
      <OrderTable />
    </div>
  );
};

export default Dashboard;
