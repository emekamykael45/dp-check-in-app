import { Switch, Route, Redirect } from "react-router-dom";

import Navigations from "./navigations";

import { isAdminUser } from "../utils/functions";

const UserRoutes = () => {
  let navs = Navigations || [];

  let routes = navs?.filter((x) => x?.to);
  if (!isAdminUser()) {
    routes = routes?.filter((x) => x?.to !== "/guests/new");
  }

  const paths = routes?.map((x) => x?.to);

  const pathname = window.location.pathname;

  return (
    <Switch>
      {routes?.map((route, i) => (
        <Route
          key={i}
          exact
          path={route?.to || ""}
          component={route?.component}
        />
      ))}

      <Route
        path="*"
        render={() => (
          <Redirect to={paths.includes(pathname) ? pathname : "/home"} />
        )}
      />
    </Switch>
  );
};

export default UserRoutes;
