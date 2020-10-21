import { getPhotos, getPhoto } from '../api/photos';

export const LOAD_PHOTOS = 'LOAD_PHOTOS';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_PHOTOS:
      return action.photos;
    default:
      return state;
  }
  
}

const loadPhotos = (list) => (dispatch) => {
  dispatch({
    type: LOAD_PHOTOS,
    photos: {
      ...list
    }
  });
};


export const fetchPhotos = () => (dispatch) => {
  return getPhotos().then((data) => dispatch(loadPhotos(data)));
};