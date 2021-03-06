import { getToken } from '../api/auth';
import { isEqual } from 'lodash';

const TOKEN_REQUEST = 'TOKEN_REQUEST';
const initialState = { isToken: false };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_REQUEST:
      return {
        ...state,
        isToken: true
      };
    default:
      return state;
  }  
}

const loadToken = () => ({ type: TOKEN_REQUEST });

export const shouldFetchToken = (state, nextValue) => {
  const isToken = state.isToken;

  return !isEqual(isToken, nextValue);
};

export const fetchToken = () => (dispatch) => {
  return getToken().then(() => {
    dispatch(loadToken())
  });
};