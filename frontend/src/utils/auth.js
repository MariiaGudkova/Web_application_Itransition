import { BASE_URL } from "./constants";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password }),
  }).then((res) => res.json());
};