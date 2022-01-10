import baseUrl from './const';

export default function useAuth() {

  const handleResponse = (res) => {
    const answer = res.ok ? res.text() : Promise.reject(`Ошибка: ${res.status}`);
    return answer;
  };
  return {
    register({ password, email }) {
      fetch(`${baseUrl}register`, {
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
      fetch(`${baseUrl}login`, {
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
      fetch(`${baseUrl}logout`, {
        method: 'GET',
        credentials: 'include',
      }).then(handleResponse);
    }
  }
}

