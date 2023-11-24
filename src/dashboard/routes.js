import { Switch, Route, Redirect } from "react-router-dom";

import Navigations from "./navigations";

const UserRoutes = () => {
  let navs = Navigations || [];

  const routes = navs?.filter((x) => x?.to);

  const paths = routes?.map((x) => x?.to);

  const pathname = window.location.pathname;

  console.log(paths, "paths");
  console.log(pathname, "pathname");

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
