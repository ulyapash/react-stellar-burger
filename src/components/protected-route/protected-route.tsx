import { FC } from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";

import { userIsLoggedSelector } from "../../services/selectors/userSelector";
import { useAppSelector } from "../../types";

type TProps = RouteProps & {
  authorized?: boolean;
};

export const ProtectedRoute: FC<TProps> = ({
  authorized = true,
  children,
  ...rest
}) => {
  const isLogged = useAppSelector(userIsLoggedSelector);
  const location = useLocation<{ from: string }>();

  if (authorized && !isLogged) {
    return (
      <Route {...rest}>
        <Redirect
          to={{ pathname: "/login", state: { from: location.pathname } }}
        />
      </Route>
    );
  }

  if (!authorized && isLogged) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: location?.state?.from || "/" }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
