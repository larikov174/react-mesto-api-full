function useApi() {
  // const baseUrl = 'https://api.larikov.nomoredomains.rocks/';
  const baseUrl = 'http://localhost:3001/';
  const handleResponse = (res) => {
    const answer = res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    return answer;
  };

  return {
    getCards() {
      return fetch(`${baseUrl}cards`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain',
        },
      }).then(handleResponse);
    },

    getUser() {
      return fetch(`${baseUrl}users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain',
        },
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
        headers: {
          'Content-Type': 'text/plain',
        },
      }).then(handleResponse);
    },

    checkToken(token) {
      return fetch(`${baseUrl}users/me`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(handleResponse);
    },
  };
}

export default useApi;
