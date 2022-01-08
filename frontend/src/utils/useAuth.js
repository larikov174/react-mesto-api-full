import { useState, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import baseUrl from './const';

export default function useAuth() {
  const setUser = useContext(CurrentUserContext);
  const [error, setError] = useState(null);

  const setUserContext = async function findUser() {
    await fetch(`${baseUrl}users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        setUser(res.json());
      })
      .catch((err) => {
        setError(err);
      })
  }

  const handleResponse = (res) => {
    const answer = res.ok ? res.text() : Promise.reject(`Ошибка: ${res.status}`);
    return answer;
  };

  const signUp = async ({ password, email }) => fetch(`${baseUrl}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then(handleResponse);

  const signIn = async ({ password, email }) => fetch(`${baseUrl}signin`, {
    method: 'POST',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then(async () => {
      await setUserContext();
    });

  const signOut = async () => fetch(`${baseUrl}signout`, {
    method: 'GET',
    credentials: 'include',
  }).then(handleResponse);

  return {
    signUp,
    signIn,
    signOut,
    error,
  };
}
