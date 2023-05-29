// export const BASE_URL = "https://auth.nomoreparties.co";
export const BASE_URL = 'http://localhost:3000'
// export const BASE_URL = 'https://api.evglbnv.nomoredomains.rocks'

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: data.password,
      email: data.email,
    }),
  }).then(getResponse);
};

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: data.password,
      email: data.email,
    }),
  }).then(getResponse)
  // .then((data) => {
  //   localStorage.setItem('jwt', data.token)
  //   return data
  // });
};

// checktoken
export const getContent = () => {
  const token = localStorage.getItem('token')
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': "application/json",
      'Authorization': `Bearer ${token}`,
    },
  }).then(getResponse);
};
