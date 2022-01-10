import React, { useState, useEffect, useCallback, useRef } from 'react';
import useApiUser from "./useApiUser";

export default function useFindUser() {
  const { getUserInfo } = useApiUser();
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(null);
  const mountedRef = useRef(true)

  // eslint-disable-next-line consistent-return
  const exec = useCallback(async () => {
    try {
      const res = await getUserInfo();
      if (!mountedRef.current) return null;
      setUser(res)
    }
    finally {
      // eslint-disable-next-line no-unsafe-finally
      if (!mountedRef.current) return null;
      setUserChecked(true)
    }
  }, [mountedRef])

  useEffect(() => {
    exec();
    return () => {
      mountedRef.current = false;
    }
  })

  // useEffect(() => {
  //   getUserInfo()
  //     .then(res => {
  //       setUser(res);
  //     })
  //     .finally(() => {
  //       setUserChecked(true);
  //     });

  //   return () => {
  //     setUserChecked(null);
  //   };
  // }, [])

  if (!userChecked) {
    return (
      <div>Check user login...</div>
    )
  }
  // eslint-disable-next-line no-console
  console.log(user);

  return {
    user,
  }
}
