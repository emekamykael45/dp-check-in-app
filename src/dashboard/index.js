import React from "react";
import { BrowserRouter } from "react-router-dom";

import NavRoutes from "./routes";

const Dashboard = () => {
  return (
    <BrowserRouter>
      <div className="dashboard">
        <NavRoutes />
      </div>
    </BrowserRouter>
  );
};

export default Dashboard;
