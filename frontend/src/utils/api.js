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
    return Promise.reject({status: res.status, message: `Ошибка: ${res.status}}`});
  };

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getJsonOnError).then(res => res.data);
  }

  getAllUsers = () => {
    return fetch(`${this._baseUrl}/users`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getJsonOnError).then(res => res.data);
  };

  deleteUser = (ids) => {
    return fetch(`${this._baseUrl}/deleteUsers`, {
      method: 'DELETE',
      headers: this._headers,
      body:  JSON.stringify({ ids }),
    }).then(this._getJsonOnError).then(res => res.data);
  };

  blockUser = (ids) => {
    return fetch(`${this._baseUrl}/blockUsers`, {
      method: 'PATCH',
      headers: this._headers,
      body:  JSON.stringify({ ids }),
    }).then(this._getJsonOnError).then(res => res.data);
  }

  unblockUser = (ids) => {
    return fetch(`${this._baseUrl}/unblockUsers`, {
      method: 'PATCH',
      headers: this._headers,
      body:  JSON.stringify({ ids }),
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
