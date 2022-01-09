/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// import useApiUser from '../utils/useApiUser';
import useFindUser from '../utils/useFindUser';

export default function ProtectedRoute({ children }) {
  const {user} = useFindUser();
  // const { getUserInfo } = useApiUser();
  // const [user, setUser] = useState(null);
  // const [userChecked, setUserChecked] = useState(null);

  // useEffect(() => {
  //   getUserInfo()
  //     .then(res => {
  //       setUser(res);
  //     })
  //     .finally(() => {
  //       setUserChecked(true);
  //     });

  //   return (() => setUserChecked(null))
  // }, [])

  // if (!userChecked) {
  //   return (
  //     <div>Check user login...</div>
  //   )
  // }

  return user ? children : <Navigate to="./login" replace />;
}
