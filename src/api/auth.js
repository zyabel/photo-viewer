import { apiInstance } from './config';

const setToken = (token) => {
  if (token) {
    localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
  } else {
    localStorage.removeItem('REACT_TOKEN_AUTH');
  }
};

export function getToken() {
  return apiInstance
    .post(`/auth`, {
      "apiKey": "23567b218376f79d9415"
    })
    .then((response) => {
      let token = response.data.token;
      setToken(token);
    })
    .catch((error) => {
      console.log(error)
    });
}