class Api {
  constructor({ token, link }) {
    this._token = token;
    this._link = link;
  }

  _handleResponse = (res) => {
    const answer = res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`);
    return answer;
  }

  _getInitCards() {
    return fetch(`${this._link}cards`, {
      headers: {
        Authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  _getUserInfo() {
    return fetch(`${this._link}users/me`, {
      headers: {
        Authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._link}users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponse);
  }

  postCard(card) {
    return fetch(`${this._link}cards`, {
      method: 'POST',
      headers: {
        Authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._handleResponse);
  }

  removeCard(card) {
    return fetch(`${this._link}cards/${card._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  setLike(card) {
    return fetch(`${this._link}cards/likes/${card._id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  removeLike(card) {
    return fetch(`${this._link}cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  uploadAvatar(link) {
    return fetch(`${this._link}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handleResponse);
  }

  getInitData() {
    return Promise.all([this._getUserInfo(), this._getInitCards()]);
  }
}

const api = new Api({
  token: 'c4b6220d-e8d9-4ddd-adea-4fda80f87475',
  link: 'https://api.larikov.nomoredomains.rocks/',
});

export default api;
