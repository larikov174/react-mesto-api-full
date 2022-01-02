import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const authed = React.useContext(AuthContext);
  return authed ? children : <Navigate to="./sign-in" replace />;
}

export default ProtectedRoute;
