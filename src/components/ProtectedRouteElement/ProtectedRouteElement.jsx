import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export const ProtectedRouteElement = ({ element, onlyNotAuth, onlyAfterForgotPassword }) => {
  const location = useLocation();
  const prevLocation = location.state && location.state.prevLocation;

  if (!onlyNotAuth && !Cookies.get("accessToken")) {
    return <Navigate Navigate to='/login' state={{from: location}} replace />;
  }

  if (onlyNotAuth && Cookies.get("accessToken")) {
    return <Navigate to="/" replace />;
  }

  if (onlyAfterForgotPassword) {
    if (prevLocation && prevLocation.pathname === "/forgot-password") {
      return element
    }
    return <Navigate to="/" replace />
  }

  return element
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.node,
  onlyNotAuth: PropTypes.bool,
  onlyAfterForgotPassword: PropTypes.bool,
}
