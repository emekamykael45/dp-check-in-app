import React from "react";

import { Arrow } from "./arrow";
import { Home } from "./home";
import { Logout } from "./logout";
import { Search } from "./search";

const Icon = ({ name }) => {
  switch (name) {
    case "arrow":
      return <Arrow />;
    case "home":
      return <Home />;
    case "logout":
      return <Logout />;
    case "search":
      return <Search />;
    default:
      return <Arrow />;
  }
};

export default Icon;
