// @flow
import {
  FETCH_PHOTOS__ERROR,
  FETCH_PHOTOS__LOADING,
  FETCH_PHOTOS__SUCCESS,
} from '../actions/photos';

const defaultState = {
  photos: [],
  count: 0,
  loading: false,
  error: {},
};

const photosReducer = (state: Object = defaultState, action: Object = {}) => {
  switch (action.type) {
    case FETCH_PHOTOS__SUCCESS: {
      const { 'x-total-count': count } = action.payload.headers;
      return {
        ...state,
        photos: action.payload.data,
        count: parseInt(count, 10),
      };
    }
    case FETCH_PHOTOS__LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case FETCH_PHOTOS__ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default photosReducer;
