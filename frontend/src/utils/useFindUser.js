import { useState, useEffect } from 'react';
import baseUrl from './const';

export default function useFindUser() {
  const loggedUser = localStorage.getItem('email');
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function findUser() {
      await fetch(`${baseUrl}users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUser(res);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
    findUser();
  }, [loggedUser]);

  return {
    user,
    isLoading
  }
}
