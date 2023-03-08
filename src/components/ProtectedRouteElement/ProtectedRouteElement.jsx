import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRouteElement = ({ element, onlyNotAuth, onlyAfterForgotPassword }) => {
  let location = useLocation();
  let prevLocation = location.state && location.state.prevLocation;

  if (!onlyNotAuth && !localStorage.getItem("login")) {
    return <Navigate Navigate to='/login' state={{from: location}} replace />;
  }

  if (onlyNotAuth && localStorage.getItem("login")) {
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
