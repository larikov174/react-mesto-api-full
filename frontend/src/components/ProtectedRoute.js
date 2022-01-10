/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
// import useApiUser from '../utils/useApiUser';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(CurrentUserContext);
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
  console.log(user);

  return user ? children : <Navigate to="./login" replace />
}
