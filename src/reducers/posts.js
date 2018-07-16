// @flow
import {
  FETCH_POSTS__ERROR,
  FETCH_POSTS__LOADING,
  FETCH_POSTS__SUCCESS,
} from '../actions/posts';

const defaultState = {
  posts: [],
  count: 0,
  loading: false,
  error: {},
};

export default function postsReducer(state: Object = defaultState, action: Object = {}) {
  switch (action.type) {
    case FETCH_POSTS__SUCCESS: {
      const { 'x-total-count': count } = action.payload.headers;
      return {
        ...state,
        posts: action.payload.data,
        count: parseInt(count, 10),
      };
    }
    case FETCH_POSTS__LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case FETCH_POSTS__ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
