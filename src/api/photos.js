import { apiInstance } from './config';

const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH'));

export function getPhotos() {
  return apiInstance
    .get(`/images`,  {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error)
    });
}

export function getPhoto(id) {
  return apiInstance
    .get(`/images/${id}`,  {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error)
    });
}