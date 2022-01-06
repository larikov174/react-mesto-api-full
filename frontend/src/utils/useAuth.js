import baseUrl from './const';

function useAuth() {

  const handleResponse = (res) => {
    const answer = res.ok ? res.text() : Promise.reject(`Ошибка: ${res.status}`);
    return answer;
  };

  return {
    signUp({ password, email }) {
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

    signIn({ password, email }) {
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

    signOut() {
      return fetch(`${baseUrl}signout`, {
        method: 'GET',
        credentials: 'include',
      }).then(handleResponse);
    },
  };
}

export default useAuth;
