import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { userIsLoggedSelector } from "../../services/selectors/userSelector";

export const ProtectedRoute = ({ authorized = true, children, ...rest }) => {
  const isLogged = useSelector(userIsLoggedSelector);
  const location = useLocation();

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

ProtectedRoute.propTypes = {
  authorized: PropTypes.bool,
};
