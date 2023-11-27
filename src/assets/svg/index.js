import React from "react";

import { Arrow } from "./arrow";
import { Delete } from "./delete";
import { Guest } from "./guest";
import { Home } from "./home";
import { Logout } from "./logout";
import { QrCode } from "./qr-code";
import { Search } from "./search";

const Icon = ({ name }) => {
  switch (name) {
    case "arrow":
      return <Arrow />;
    case "delete":
      return <Delete />;
    case "guest":
      return <Guest />;
    case "home":
      return <Home />;
    case "logout":
      return <Logout />;
    case "qrCode":
      return <QrCode />;
    case "search":
      return <Search />;
    default:
      return <Arrow />;
  }
};

export default Icon;
