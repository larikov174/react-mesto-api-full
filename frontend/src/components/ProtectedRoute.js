import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(CurrentUserContext);
  return user ? children : <Navigate to="./sign-in" replace />;
}
