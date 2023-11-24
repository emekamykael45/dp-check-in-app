import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LoginPage from "./pages/login";

import { ProtectedRoute } from "./components/protected-route";
import Dashboard from "./dashboard";

const App = () => {
  return (
    <div className="app_container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />

          <ProtectedRoute component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
