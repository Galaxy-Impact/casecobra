import React from "react";
import Dashboard from "@/features/dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
