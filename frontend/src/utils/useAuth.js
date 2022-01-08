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

  const register = async ({ password, email }) => fetch(`${baseUrl}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then(handleResponse);

  const login = async ({ password, email }) => fetch(`${baseUrl}login`, {
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

  const logout = async () => fetch(`${baseUrl}logout`, {
    method: 'GET',
    credentials: 'include',
  }).then(handleResponse);

  return {
    register,
    login,
    logout,
    error,
  };
}
