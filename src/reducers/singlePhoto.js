// @flow
import {
  FETCH_SINGLE_PHOTO__ERROR,
  FETCH_SINGLE_PHOTO__LOADING,
  FETCH_SINGLE_PHOTO__SUCCESS,
} from '../actions/singlePhoto';

const defaultState = {
  photo: {},
  loading: false,
  error: {},
};

const singlePhotoReducer = (state: Object = defaultState, action: Object = {}) => {
  switch (action.type) {
    case FETCH_SINGLE_PHOTO__SUCCESS: {
      return {
        ...state,
        photo: action.payload.data,
      };
    }
    case FETCH_SINGLE_PHOTO__LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case FETCH_SINGLE_PHOTO__ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default singlePhotoReducer;
