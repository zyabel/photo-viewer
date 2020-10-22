import { getPhotos, getPhoto } from '../api/photos';
import { isEqual } from 'lodash';

const LOAD_PHOTOS = 'LOAD_PHOTOS';
const LOAD_SINGLE_PHOTO = 'LOAD_SINGLE_PHOTO';
const SET_LOADING_STATE = 'SET_LOADING_STATE';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_PHOTOS:
      return action.photos;
    case LOAD_SINGLE_PHOTO:
      return action.photos;
    case SET_LOADING_STATE:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
  
}

const toggleStateProp = (action, payload) => ({
  type: action,
  payload
});

const setLoadingState = (state) => toggleStateProp(SET_LOADING_STATE, state);

const loadPhotos = (list) => (dispatch, getState) => {
  const photos = getState().photos;

  dispatch({
    type: LOAD_PHOTOS,
    photos: {
      ...photos,
      list: list
    }
  });
};

const loadSinglePhoto = (image) => (dispatch, getState) => {
  const photos = getState().photos;

  dispatch({
    type: LOAD_SINGLE_PHOTO,
    photos: {
      ...photos,
      singlePhoto: image
    }
  });
};

export const shouldFetchPhotos = (state, nextValue) => {
  const photos = state.photos;

  return !isEqual(photos, nextValue);
};

export const fetchPhotos = (pageNumber) => (dispatch) => {
  dispatch(setLoadingState(true));

  return getPhotos(pageNumber).then((data) => {
    dispatch(loadPhotos(data));
    dispatch(setLoadingState(false));
  });
};

export const fetchSinglePhoto = (id) => (dispatch) => {
  dispatch(setLoadingState(true));
  return getPhoto(id).then((data) => {
    dispatch(loadSinglePhoto(data));
    dispatch(setLoadingState(false));
  });
};