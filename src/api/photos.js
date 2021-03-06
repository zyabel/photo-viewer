import { apiInstance } from './config';

const token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH'));

export function getPhotos(pageNumber) {
  const params = [];

  if (pageNumber) {
    params.push(`page=${pageNumber}`);
  }

  const queryParams = params.length ? `?${params.join('&')}` : '';

  return apiInstance
    .get(`/images${queryParams}`,  {
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
      return response.data;
    })
    .catch((error) => {
      console.log(error)
    });
}