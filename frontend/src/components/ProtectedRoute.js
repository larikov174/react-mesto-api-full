/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import useApiUser from '../utils/useApiUser';

export default function ProtectedRoute({ children }) {
  const { checkToken } = useApiUser();
  const [user, setUser] = useState(null);
  const mountedRef = useRef(true)
  // const checkAuth = async () => {
  //   const res = await checkToken();
  //   return setUser(res);
  // };

  const execute = useCallback(()=>checkToken()
    .then(res=>{
      if (!mountedRef.current) return null
      return setUser(res)

    }),[])

    useEffect(()=>{
      execute();
      return (()=>{
        mountedRef.current = false;
      })
    }, [])

   return user ? children : <Navigate to="./login" replace />;
}
