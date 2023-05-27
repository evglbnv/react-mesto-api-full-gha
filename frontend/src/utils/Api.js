class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // получение данных о пользователе
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  //получение карточек с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  //Редактирование профиля
  userEditInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  //обновление аватара

  setUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

  addCardRequest(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCardRequest(id) {
    return fetch(`${this.baseUrl}/cards/${id} `, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this.baseUrl}/cards/${id}/likes `, {
        method: "DELETE",
        headers: this.headers,
      }).then((res) => this._checkResponse(res));
    }

    return fetch(`${this.baseUrl}/cards/${id}/likes `, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }
}

//   addLike(id) {
//     return fetch(`${this.baseUrl}/cards/${id}/likes `, {
//       method: "PUT",
//       headers: this.headers,
//     }).then(this._checkResponse);
// //   }

//   deleteLike(id) {
//     return fetch(`${this.baseUrl}/cards/${id}/likes `, {
//       method: "DELETE",
//       headers: this.headers,
//     }).then(this._checkResponse);
//   }
// // }

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "d9d4d338-c6a2-4158-acba-2ca5c25fc52c",
    "Content-Type": "application/json",
  },
});
