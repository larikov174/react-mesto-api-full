/* eslint-disable no-console */
import baseUrl from './const';

export default function useAuth() {

  const handleResponse = (res) => {
    const answer = res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    return answer;
  };

  return {
    register({ password, email }) {
      return fetch(`${baseUrl}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          email,
        }),
      }).then(handleResponse);
    },

    login({ password, email }) {
      return fetch(`${baseUrl}login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          email,
        }),
      }).then(handleResponse);
    },

    logout() {
      return fetch(`${baseUrl}logout`, {
        method: 'GET',
        credentials: 'include',
      }).then(handleResponse);
    }
  }
}

