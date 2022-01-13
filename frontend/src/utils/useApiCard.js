import baseUrl from './const';

export default function useApiCard() {
  const handleResponse = (res) => {
    const answer = res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    return answer;
  };

  return {
    getCards() {
      return fetch(`${baseUrl}cards`, {
        method: 'GET',
        credentials: 'include',
      }).then(handleResponse);
    },

    postCard(card) {
      return fetch(`${baseUrl}cards`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: card.name,
          link: card.link,
        }),
      }).then(handleResponse);
    },

    removeCard(card) {
      return fetch(`${baseUrl}cards/${card._id}`, {
        method: 'DELETE',
        credentials: 'include',
      }).then(handleResponse);
    },

    setLike(card) {
      return fetch(`${baseUrl}cards/${card._id}/likes`, {
        method: 'PUT',
        credentials: 'include',
      }).then(handleResponse);
    },

    removeLike(card) {
      return fetch(`${baseUrl}cards/${card._id}/likes`, {
        method: 'DELETE',
        credentials: 'include',
      }).then(handleResponse);
    }

  }
}
