// @flow
import {
  FETCH_ALBUMS__ERROR,
  FETCH_ALBUMS__LOADING,
  FETCH_ALBUMS__SUCCESS,
} from '../actions/albums';

const defaultState = {
  albums: [],
  count: 0,
  loading: false,
  error: {},
};

const albumsReducer = (state: Object = defaultState, action: Object = {}) => {
  switch (action.type) {
    case FETCH_ALBUMS__SUCCESS: {
      const { 'x-total-count': count } = action.payload.headers;
      return {
        ...state,
        albums: action.payload.data,
        count: parseInt(count, 10),
      };
    }
    case FETCH_ALBUMS__LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case FETCH_ALBUMS__ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default albumsReducer;
