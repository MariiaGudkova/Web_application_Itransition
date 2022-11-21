import { BASE_URL } from "./constants";

class Api {
  constructor({ baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._getJsonOnError = this._getJsonOnError.bind(this);
  }

  _getJsonOnError = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getAllUsers = (jwt) => {
    return fetch(`${this._baseUrl}/`, {
      method: 'GET',
      headers: this._headers,
      body:  JSON.stringify({ jwt }),
    }).then(this._getJsonOnError).then(res => res.data);
  };

  deleteUser = (id) => {
    return fetch(`${this._baseUrl}/deleteUsers`, {
      method: 'DELETE',
      headers: this._headers,
      body:  JSON.stringify({ id }),
    }).then(this._getJsonOnError).then(res => res.data);
  };

  blockUser = (id, status) => {
    return fetch(`${this._baseUrl}/deleteUsers`, {
      method: 'PATCH',
      headers: this._headers,
      body:  JSON.stringify({ id, status }),
    }).then(this._getJsonOnError).then(res => res.data);
  }
  
  updateToken = (jwt) => {
    this._headers['Authorization'] = `Bearer ${jwt}`;
  };
};

const jwt = localStorage.getItem("jwt");
const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
    'Authorization': `Bearer ${jwt}`,
  },
});

export default api;
