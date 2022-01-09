/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useApiUser from '../utils/useApiUser';

export default function ProtectedRoute({ children }) {
  const { checkToken } = useApiUser();
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(null);

  useEffect(()=>{
    checkToken()
      .then(res => {
        setUser(res);
      })
      .finally(() => {
        setUserChecked(true);
      });
  }, [])

  if (!userChecked) {
    return (
      <div>Check user login...</div>
    )
  }

  return user ? children : <Navigate to="./login" replace />;
}
