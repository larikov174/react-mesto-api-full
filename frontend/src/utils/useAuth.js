import baseUrl from './const';

export default function useAuth() {

  const handleResponse = (res) => {
    const answer = res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    return answer;
  };

  return {
    signup({ password, email }) {
      return fetch(`${baseUrl}signup`, {
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

    signin({ password, email }) {
      return fetch(`${baseUrl}signin`, {
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

    signout() {
      return fetch(`${baseUrl}signout`, {
        method: 'GET',
        credentials: 'include',
      }).then(handleResponse);
    }
  }
}

