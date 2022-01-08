/* eslint-disable no-console */
import baseUrl from './const';

export default function useHandleUser() {

  const handleResponse = (res) => {
    const answer = res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    return answer;
  };

  return {
    getUserInfo() {
      return fetch(`${baseUrl}users/me`, {
        method: 'GET',
        credentials: 'include',
      }).then(res=>res.json());
    },

    setUserInfo(data) {
      return fetch(`${baseUrl}users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      }).then(handleResponse);
    },

    uploadAvatar(link) {
      return fetch(`${baseUrl}users/me/avatar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar: link,
        }),
      }).then(handleResponse);
    },
  }
}
