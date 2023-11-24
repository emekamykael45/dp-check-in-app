import { Route, Redirect } from "react-router-dom";

import { getUserDetails } from "../utils/functions";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = getUserDetails();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
