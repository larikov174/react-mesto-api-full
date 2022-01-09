import React, { useState, useEffect } from 'react';
import useApiUser from "./useApiUser";

export default function useFindUser() {
  const { getUserInfo } = useApiUser();
  const [user, setUser] = useState(null);
  const [userChecked, setUserChecked] = useState(null);

  useEffect(() => {
    getUserInfo()
      .then(res => {
          setUser(res);
      })
      .finally(() => {
          setUserChecked(true);
      });

    return () => {
      setUserChecked(null);
    };
  }, [])

  if (!userChecked) {
    return (
      <div>Check user login...</div>
    )
  }

  return {
    user,
  }
}
