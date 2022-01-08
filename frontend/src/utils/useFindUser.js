import { useState, useEffect } from 'react';
import baseUrl from './const';

export default function useFindUser() {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function findUser() {
      await fetch(`${baseUrl}users/me`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => {
          if(res._id){
            setUser(res);
          }
        })
        .catch((err) => setError(err));
    }
    findUser();
  }, []);

  return {
    user,
    error,
  }
}
